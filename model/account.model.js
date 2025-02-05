const mongoose = require("mongoose")
const randomString = require("../helpers/generate")
const accountSchema = new mongoose.Schema(
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
        role_id: String,
        status: String,
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

const Account = mongoose.model("account", accountSchema, "account")

module.exports = Account