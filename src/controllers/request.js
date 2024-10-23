const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

const sendRequest = async (req, res) =>{
    try {
        const fromUser = req.user.username
        const toUser = req.params.username
        const status = "pending"
        if(fromUser.toString() === toUser.toString()) throw new Error('cannot send request to yourself!')
        const usernameExist = await User.findOne({ username:toUser })
        if(!usernameExist) throw new Error('User not found!')
        const requestExist = await ConnectionRequest.findOne({ fromUser, toUser })
        if(requestExist) throw new Error('Connection request already sent!')
        const connectionRequest = new ConnectionRequest({
            fromUser,
            toUser,
            status
        })
        const data = await connectionRequest.save()
        res.send({
            message: "Connection request sent successfully!",
            data
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = sendRequest
