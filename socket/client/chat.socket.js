const Chat = require("../../model/chat.model")
const uploadToCloud = require("../../helpers/uploadToCloud")

module.exports = async (res, req) => {
    const userId = res.locals.user.id
    _io.once('connection', (socket) => {
        console.log("a user", socket.id)

        socket.join(req.params.roomId)
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const image = []
            const roomId = req.params.roomId
            // console.log(roomId)
            for (const item of data.image) {
                const link = await uploadToCloud(item)
                image.push(link)
            }
            // console.log(image)

            // Lưu cào data base
            const chat = new Chat(
                {
                    user_id: userId,
                    room_chat_id: roomId,
                    content: data.content,
                    image: image
                }
            )
            await chat.save()

            // Trả data về client
            data = {
                userId: userId,
                fullName: res.locals.user.fullName,
                data: data,
                img: image
            }
            // console.log(data)
            _io.to(roomId).emit("SERVER_RETURN_MESSAGE", (data))
        });

        socket.on("CLIENT_SEND_TYPING", async (type) => {
            // Trả data về client
            data = {
                userId: userId,
                fullName: res.locals.user.fullName,
                type: type
            }
            socket.broadcast.to(req.params.roomId).emit("SERVER_RETURN_TYPING", data)
        })
    })
}