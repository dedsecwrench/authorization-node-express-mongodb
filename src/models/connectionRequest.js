const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUser: {
        type: String,
        require: true
    },
    toUser: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending', 'accepted', 'rejected'],
            message: `{Value} incorrect status type!`
        }
    }
},
{timestamps: true})

const ConnectionRequest = new mongoose.model('connectionRequest',  connectionRequestSchema)

module.exports = ConnectionRequest


