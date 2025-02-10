// const Chat = require("../../model/chat.model")
// const uploadToCloud = require("../../helpers/uploadToCloud")
const User = require("../../model/user.model")

module.exports = async (res) => {
    const idA = res.locals.user.id
    _io.once('connection', (socket) => {
        console.log("a add user", socket.id)
        // Người dùng gửi yêu cầu kết bạn
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const idB = userId // Id của B
            // Thêm id của A vào acceptFriend của B
            const existUserA = await User.findOne({
                _id: idB,
                status: "active",
                acceptFriend: idA,
            })

            if (!existUserA) {
                await User.updateOne(
                    {
                        _id: idB
                    },
                    {
                        $push: { acceptFriend: idA }
                    }
                )
            }
            // Thêm id của B vào requestFriend của A
            const existUserB = await User.findOne({
                _id: idA,
                status: "active",
                requestFriend: idB,
            })

            if (!existUserB) {
                await User.updateOne(
                    {
                        _id: idA
                    },
                    {
                        $push: { requestFriend: idB }
                    }
                )
            }

            // Lấy độ dài acceptFriend của B trả về cho B
            const userB = await User.findOne(
                {
                    _id: idB
                }
            )
            const lengthAcceptFriend = userB.acceptFriend.length
            socket.broadcast.emit("SERVER_RETURN_LENGHT_ACCEPT", {
                userId: idB,
                lengthAcceptFriend: lengthAcceptFriend
            })

            // Lấy thông tin của A để hiển thị bên lời mời kết bạn của B
            socket.broadcast.emit(
                "SERVER_RETURN_INFOR",{
                    userId: idB,
                    userA : idA,
                    fullName: res.locals.user.fullName,
                    avatar: res.locals.user.avatar || ""
                } 
            )
        })

        //Người dùng hủy yêu cầu kết bạn
        socket.on("CLIENT_CANCEL_REQUEST", async (idB) => {
            console.log("CLIENT_CANCEL_REQUEST")
            // Xóa id của A trong acceptFriend của B
            const existUserA = await User.findOne(
                {
                    _id: idB,
                    acceptFriend: idA
                }
            )
            if (existUserA) {
                await User.updateOne(
                    {
                        _id: idB
                    },
                    {
                        $pull: { acceptFriend: idA }
                    }
                )
            }

            // Xóa id của B trong requestFriend của A
            const existUserB = await User.findOne(
                {
                    _id: idA,
                    requestFriend: idB
                }
            )
            if (existUserB) {
                await User.updateOne(
                    {
                        _id: idA
                    },
                    {
                        $pull: { requestFriend: idB }
                    }
                )
            }
        })


        // Người dùng từ chối kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (idB) => {
            console.log("CLIENT_REFUSE_FRIEND")
            // Xóa id của A trong requestFriend của B
            const existUserA = await User.findOne(
                {
                    _id: idB,
                    requestFriend: idA
                }
            )
            if (existUserA) {
                await User.updateOne(
                    {
                        _id: idB
                    },
                    {
                        $pull: { requestFriend: idA }
                    }
                )
            }

            // Xóa id của B trong acceptFriend của A
            const existUserB = await User.findOne(
                {
                    _id: idA,
                    acceptFriend: idB
                }
            )
            if (existUserB) {
                await User.updateOne(
                    {
                        _id: idA
                    },
                    {
                        $pull: { acceptFriend: idB }
                    }
                )
            }

            // Lấy độ dài acceptFriend của B trả về cho B
            const userA = await User.findOne(
                {
                    _id: idA
                }
            )
            const lengthAcceptFriend = userA.acceptFriend.length
            _io.emit("SERVER_RETURN_LENGHT_ACCEPT", {
                userId: idA,
                lengthAcceptFriend: lengthAcceptFriend
            })
        })

        // Người dùng đồng ý kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (idB) => {
            console.log("CLIENT_ACCEPT_FRIEND")
            // Xóa id của A trong requestFriend của B, thêm id của A vào friendList của B
            const existUserA = await User.findOne(
                {
                    _id: idB,
                    requestFriend: idA
                }
            )
            if (existUserA) {
                await User.updateOne(
                    {
                        _id: idB
                    },
                    {
                        $pull: { requestFriend: idA },
                        $push: {
                            friendList: {
                                user_id: idA,
                                zoom_chat_id: ""
                            }
                        }
                    }
                )
            }

            // Xóa id của B trong acceptFriend của A, thêm id của B vào friendList của A
            const existUserB = await User.findOne(
                {
                    _id: idA,
                    acceptFriend: idB
                }
            )
            if (existUserB) {
                await User.updateOne(
                    {
                        _id: idA
                    },
                    {
                        $pull: { acceptFriend: idB },
                        $push: {
                            friendList: {
                                user_id: idB,
                                zoom_chat_id: ""
                            }
                        }
                    }
                )
            }
        })

        // Người dùng hủy kết bạn
        socket.on("CLIENT_CANCEL_FRIEND_LIST", async (idB) => {
            // Xóa B khỏi listFriend của A
            await User.updateOne(
                {
                    _id: idA
                },
                {
                    $pull: {
                        friendList:{
                            user_id: idB
                        }
                    }
                }
            )
            // Xóa A khỏi listFriend của B
            await User.updateOne(
                {
                    _id: idB
                },
                {
                    $pull: {
                        friendList:{
                            user_id: idA
                        }
                    }
                }
            )
        })
    })
}