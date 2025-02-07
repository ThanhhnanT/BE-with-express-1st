const mongoose = require("mongoose")
// const randomString = require("../helpers/generate")
const settingSchema = new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        phone: String,
        email: String,
        address: String,
        copyRight: String,
    },
    {
        timestamps: true
    }
)

const Setting = mongoose.model("set" ,settingSchema, "setting-general")

module.exports = Setting