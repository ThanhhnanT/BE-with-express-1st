const mongoose = require("mongoose")

const roomChat = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        typeRoom: String,
        status: String,    
        users:[
            {
                user_id: String,
                role: String,
                
            }
        ],      
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

const zoom = mongoose.model("zoom", roomChat, 'zooms-chat')

module.exports = zoom