const validator = require('validator')

const validateRegistration = (data) => {
    const {firstname, lastname, username, email, password } = data
    if(!firstname || !lastname || !username ){
        throw new Error('All fields are mandatory!')
    } else if(!validator.isEmail(email)){
        throw new Error('Invalid email!')
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Password should be strong!')
    }
}

const validateLogin = (data) => {
    const { username, email } = data
    if(!username && !email){
        throw new Error('Invalid credentials!')
    } else if(email){
        if(!validator.isEmail(email)){
            throw new Error('Invalid email!')
        }
    }
}

const validateEditProfile = (data) =>{
    const allowedFields = ['firstname', 'lastname', 'username', 'email', 'skills', 'about']
    const keys = Object.keys(data)
    const isAllowed = keys.every(field => allowedFields.includes(field))
    if(!isAllowed){
        throw new Error('Invalid Field')
    }
}

module.exports = { validateRegistration, validateLogin, validateEditProfile }




