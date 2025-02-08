const Chat = require("../../model/chat.model")
const User = require("../../model/user.model")

module.exports.chat = async (req, res) => {
    const userId = res.locals.user.id 

    //SocketIo
    _io.once('connection', (socket) => {
        console.log("a user", socket.id)
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu cào data base
            const chat = new Chat(
                {
                    user_id: userId,
                    content: content
                }
            )
            await chat.save()
        })
    })
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