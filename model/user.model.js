const mongoose = require("mongoose")
const randomString = require("../helpers/generate")
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: randomString.randomString(20)
        },
        phone: String,
        avatar: String,
        acceptFriend : Array,
        requestFriend: Array,
        friendList: [
            {
                user_id: String,
                room_chat_id: String
            }
        ],
        status:{
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("user" ,userSchema, "users")

module.exports = User