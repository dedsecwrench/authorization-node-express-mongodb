const express = require('express')

const Router = express.Router()
const {userAuth} = require('../controllers/auth')
const {viewProfile, editProfile, viewProfileFromUsername} = require('../controllers/profile')

Router.get('/profile', userAuth, viewProfile)
Router.get('/profile/:username', userAuth, viewProfileFromUsername)
Router.patch('/profile/edit', userAuth, editProfile)


module.exports = Router


