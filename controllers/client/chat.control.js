const Chat = require("../../model/chat.model")
const User = require("../../model/user.model")
const uploadToCloud = require("../../helpers/uploadToCloud")
const Socket = require("../../socket/client/chat.socket")
module.exports.chat = async (req, res) => {
    //SocketIo
        Socket(res)
    //End SocketIo

    // Lấy data chat
    const chats = await Chat.find({
        deleted: false
    })
    for (const item of chats){
        const user = await User.findOne({
            _id: item.user_id
        }).select("fullName")
        item.userName = user.fullName
    }
    // console.log(chats)

    res.render("client/pages/chat/index", {
        title: "Chat Online",
        chat: chats
    })
}