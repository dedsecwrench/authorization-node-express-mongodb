const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://CE02:vChdlMk3ODiJL8hn@cluster0.dao9x.mongodb.net/backend")
}

module.exports = connectDB