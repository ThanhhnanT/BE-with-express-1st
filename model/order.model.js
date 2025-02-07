const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema(
    {
        // user_id: String,
        card_id: String,
        user_infor:{
            fullName: String,
            phone: String,
            address: String
        },
        product:[
            {
                product_id: String,
                price: Number,
                discountPercentage: Number, 
                quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model("order", orderSchema, "order")

module.exports = Order