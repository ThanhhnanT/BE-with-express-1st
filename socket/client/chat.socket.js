const Chat = require("../../model/chat.model")
const uploadToCloud = require("../../helpers/uploadToCloud")

module.exports = async (res) => {
    const userId = res.locals.user.id
    _io.once('connection', (socket) => {
        console.log("a user", socket.id)
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const image = []

            for (const item of data.image) {
                const link = await uploadToCloud(item)
                image.push(link)
            }
            // console.log(image)

            // Lưu cào data base
            const chat = new Chat(
                {
                    user_id: userId,
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
            _io.emit("SERVER_RETURN_MESSAGE", (data))
        });

        socket.on("CLIENT_SEND_TYPING", async (type) => {
            // Trả data về client
            data = {
                userId: userId,
                fullName: res.locals.user.fullName,
                type: type
            }
            socket.broadcast.emit("SERVER_RETURN_TYPING", data)
        })
    })
}