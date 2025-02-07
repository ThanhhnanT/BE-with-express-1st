const Cart = require('../../model/cart.model')
const Product = require("../../model/product.model")
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

module.exports.cart = async (req, res) => {
    const cart =  res.locals.minicart.product
    if (cart){
        for (const item of cart){
            const product = await Product.findOne(
                {
                    _id: item.product_id
                }
            )
            item.productInfor = product
        }
    }
    // console.log(cart)
    const totalPrice = () => {
        var sum = 0
        for (const item of cart){
            sum += item.quantity * (item.productInfor.price * (100 -item.productInfor.discountPercentage)/100)  
        }
        return sum
    }
    totalPrices = totalPrice()
    // console.log(totalPrices)
    res.render("client/pages/cart/index.pug",{
        title: "Giỏ hàng",
        cart: cart,
        totalPrice: totalPrices
    })
}

// Xóa sản phẩm
module.exports.deleteCart = async (req, res) => {
    const productId = req.params.id
    const cartId = req.cookies.cartId 
    // console.log(productId)

    await Cart.updateOne(
        {
            _id: cartId
        },
        {
            "$pull": {product: {"product_id": productId}}
        }
    )
    res.redirect("back")
}

// Thay đổi số lượng
module.exports.updateCart = async (req,res) => {
    // console.log(req.params)
    await Cart.updateOne(
        {
            _id: req.cookies.cartId,
            'product.product_id' : req.params.id 
        },
        {
            'product.$.quantity' : req.params.quantity
        }
    )
    res.redirect("back")
}