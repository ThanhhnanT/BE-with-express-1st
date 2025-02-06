const Cart = require("../../model/cart.model")

module.exports.cartId = async (req, res, next) => {
    // console.log()
    if(!req.cookies.cartId){
        console.log("ole")
        const cart = new Cart()
        await cart.save()
        const time = 1000*60*60*24*365
        res.cookie("cartId", cart.id,{
            expires: new Date(Date.now() + time )
        })
    }
    next()
}