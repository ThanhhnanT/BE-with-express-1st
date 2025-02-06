const Cart = require('../../model/cart.model')

module.exports.postCart = async (req, res) => {
    // console.log(req.body.quantity)
    // console.log(req.params.id)
    const cartId = req.cookies.cartId
    const productId = req.params.id
    // console.log(cartId)

    const cart = await Cart.findOne(
        {
            _id: cartId
        }
    )
    const exist = cart.product.find(item => item.product_id === productId)
    if (exist) {
        console.log("Cap nhat")
        const newQuantity = parseInt(req.body.quantity) + exist.quantity
        await Cart.updateOne(
            {
                _id: cartId,
                'product.product_id': productId
            },
            {
                'product.$.quantity': newQuantity
            }
        )
    } else {
        const objectCart = {
            product_id: productId,
            quantity: parseInt(req.body.quantity)
        }
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: { product: objectCart }
            }
        )
    }
    res.redirect("back")

}