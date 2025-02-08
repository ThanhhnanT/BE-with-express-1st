const mongoose = require("mongoose")
const randomString = require("../helpers/generate")
const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        room_chat_id: String,
        content: String,
        image: Array,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("chat", chatSchema, "chat")

module.exports = Chat