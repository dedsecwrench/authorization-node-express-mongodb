const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
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
        minLength:4,
        maxLength:25,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    skills:{
        type:[String]
    }

},{timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User