const Cart = require("../../model/cart.model")

module.exports.cartId = async (req, res, next) => {
    // console.log()
    if(!req.cookies.cartId){
        // console.log("ole")
        const cart = new Cart()
        await cart.save()
        const time = 1000*60*60*24*365
        res.cookie("cartId", cart.id,{
            expires: new Date(Date.now() + time )
        })
    } else {
        const cart = await Cart.findOne(
            {
                _id: req.cookies.cartId
            }
        )
        
        cart.totalQuantity = cart.product.reduce((sum, item) => {
            return sum + item.quantity
        }, 0)
        // console.log(cart)
        res.locals.minicart = cart
    }

    
    next()
}

