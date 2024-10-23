const express = require('express')

const Router = express.Router()
const { userAuth } = require('../controllers/auth')
const sendRequest = require('../controllers/request')

Router.post('/request/send/:username', userAuth, sendRequest)

module.exports = Router