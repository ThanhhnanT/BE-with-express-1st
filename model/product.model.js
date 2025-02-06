const mongoose = require('mongoose')
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        product_category_id: {
            type: String,
            default: ""
        },
        discountPercentage: Number,
        thumbnail: String,
        feature: String,
        status: String,
        price: Number,
        position: Number,
        deleted: {
            type: Boolean,
            default: false
        },
        createBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        updatedBy: [
            {
            account_id: String,
            updatedAt: Date,
            }
        ],
        stock: Number,
        deletedAt: Date,
        slug: {type: String, slug: "title", unique: true}
    },{
        timestamps:true
    }
)

const Product = mongoose.model("Productdd", productSchema, "products")

module.exports = Product;