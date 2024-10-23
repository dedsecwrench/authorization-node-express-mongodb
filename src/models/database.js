const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASS}@cluster0.dao9x.mongodb.net/backend`)
}

module.exports = connectDB

