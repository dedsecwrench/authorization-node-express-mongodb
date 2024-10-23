const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'firstname Required'],
        lowercase:true,
        trim:true,
        minLength:3
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:3
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[4,'username should be alteast min 4 chars.'],
        maxLength:25,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    skills:{
        type:[String]
    },
    about: {
        type: String,
        trim: true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },

},{timestamps:true})

const User = new mongoose.model('User', userSchema)

module.exports = User