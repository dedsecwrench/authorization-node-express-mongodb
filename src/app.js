const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./models/database')
const app = express()

dotenv.config()
app.use(express.json())
app.use(cookieParser())

const Router = require('./routes/routes')
app.use('/', Router)

connectDB()
.then(()=>{
    console.log('connection established!')
    app.listen(8000)
})
.catch((err)=>{
    console.log('cannot connect to database!')
})
