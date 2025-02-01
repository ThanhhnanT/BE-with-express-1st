const mongoose = require("mongoose")
slug = require("mongoose-slug-updater")
mongoose.plugin(slug)

const categorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        position: Number,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        thumbnail: String,
        slug: {
            type: String,
            slug: "title",
            unique: true
        }                
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model("category", categorySchema, "category")

module.exports = Category 