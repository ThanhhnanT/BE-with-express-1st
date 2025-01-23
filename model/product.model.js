const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        discountPercentage: Number,
        status: String,
        price: Number,
        position: Number,
        deleted: Boolean,
        stock: Number,
    }
)

const Product = mongoose.model("Productdd", productSchema, "products")

module.exports = Product;