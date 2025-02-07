const mongoose = require("mongoose")

const forgotSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 300
        }
    },
    {
        timestamps: true
    }
)

const forgotPassword = mongoose.model("forgotPassword", forgotSchema, "forgotPassword")

module.exports = forgotPassword