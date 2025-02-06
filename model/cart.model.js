const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        product:[
            {
                product_id: String, 
                quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("cart", cartSchema, "cart")

module.exports = Cart