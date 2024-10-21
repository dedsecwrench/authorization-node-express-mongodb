const express = require('express');
const Router = express.Router()
const {register, login, logout, userAuth, home} = require('../controllers/auth')

Router.post('/register', register)
Router.post('/login', login)
Router.post('/logout', logout)
Router.get('/home', userAuth, home)

module.exports = Router