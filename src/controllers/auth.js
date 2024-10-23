const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { validateRegistration, validateLogin } = require('../utils/helpers')

const register = async (req, res) =>{
    try{
        validateRegistration(req.body)
        const {firstname, lastname, username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstname, lastname, username, email, password:hashedPassword, skills:[], about:""
        })
        const data = await user.save() 
        res.send(data)
    } catch(err){
        if (err.errorResponse){
            if(err.errorResponse.keyPattern.username === 1){
                res.status(403).send('username already exist!')
            } else if(err.errorResponse.keyPattern.email === 1) {
                res.status(403).send('email already exist!')
            }
        }
        else{
            res.status(400).send(err.message)
        }
    }
}

const login = async (req, res) =>{
    try{
        validateLogin(req.body)
        const { username, email, password } = req.body
        const user = await User.findOne({
            $or: [{username:username}, {email:email}]
        })
        if(!user) throw new Error('User not found!')
        const isUserPassValid = await bcrypt.compare(password, user.password) 
        if(isUserPassValid){
        const token = await jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn: '30m'}) // , expiration time
        res.cookie('token',token, {expires: new Date(Date.now() + 8 * 3600000)})   // , expiration time
        res.send('login successfull!')
        }
        else throw new Error('Invalid Password!')
    } catch(err){
        res.status(400).send(err.message)
    }
}

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token) return res.status(401).send('Please Login!')    
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        const { id } = decodedToken
        const user = await User.findById({_id:id})
        if(!user) throw new Error('User Not Found!')
        req.user = user
        next()
    } catch(err) {
        res.send(err.message)
    }
  }

const logout = async (req, res) =>{
    try{
        res.cookie("token", null, {expires: new Date(Date.now())} )
        res.send(`logged out!`)
    } catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = { register, login, logout, userAuth }



