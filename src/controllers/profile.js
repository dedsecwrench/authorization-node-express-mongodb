const User = require('../models/user')
const {validateEditProfile} = require('../utils/helpers')

const viewProfile = async (req, res) =>{
    try{
        const user = req.user
        res.send(user)
    } catch(err){
        res.status(400).send(err.message)
    }
}

const viewProfileFromUsername = async (req, res) =>{
    try{
        const username = req.params.username
        const profileFromUsername = await User.findOne({username:username})
        if(!profileFromUsername){
            throw new Error('No such user!')
        }
        const userProfile = {
            name: `${profileFromUsername.firstname} ${profileFromUsername.lastname}`,
            username: profileFromUsername.username,
            about: profileFromUsername.about,
            skills:profileFromUsername.skills
        }
        res.send(userProfile)
    } catch(err){
        res.status(400).send(err.message)
    }
}

const editProfile = async (req, res) =>{
    try{
        validateEditProfile(req.body)
        const user = req.user
        Object.keys(req.body).map(key => user[key] = req.body[key])
        await user.save()
        res.json({
            message: `${user.firstname} Profile updated successfully`,
            user: user
        })
    } catch(err){
        res.status(400).send(err.message)
    }
}


module.exports = { viewProfile, editProfile, viewProfileFromUsername }

