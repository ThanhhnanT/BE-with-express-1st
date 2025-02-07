const Cart = require('../../model/cart.model')
const Product = require("../../model/product.model")
const Order = require("../../model/order.model")

module.exports.index = async (req, res) => {
    const cart = res.locals.minicart.product
    if (cart) {
        for (const item of cart) {
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
        for (const item of cart) {
            sum += item.quantity * (item.productInfor.price * (100 - item.productInfor.discountPercentage) / 100)
        }
        return sum
    }
    totalPrices = totalPrice()

    res.render("client/pages/checkout/index", {
        title: "Thanh toán",
        cart: cart,
        totalPrice: totalPrices
    })
}

module.exports.order = async (req, res) => {
    const cart_id = req.cookies.cartId
    const user_infor = req.body
    const cart = res.locals.minicart
    let product = []
    for (const item of cart.product) {
        const productInfor = await Product.findOne(
            {
                _id: item.product_id
            }
        )

        const object = {
            product_id: item.product_id,
            price: productInfor.price,
            discountPercentage: productInfor.discountPercentage,
            quantity: item.quantity
        }
        product.push(object)
    }
    // console.log(product)
    const order = {
        cart_id: cart_id,
        user_infor: user_infor,
        product: product
    }

    const newOrder = new Order(order)
    await newOrder.save()
    
    await Cart.updateOne(
        {
            _id: cart_id 
        },
        {
            product: []
        }
    )
    res.redirect(`/checkout/success/${newOrder.id}`)
}

module.exports.success = async (req,res) => {
    // console.log(req.params.id)
    const order = await Order.findOne(
        {
            _id: req.params.id
        }
    )
    // console.log(order)
    var sum =0
    for (const item of order.product){
        const productInfor = await Product.findOne(
            {
                _id: item.product_id
            }
        ).select("title thumbnail")
        item.productInfor = productInfor
        item.totalPrice = (item.price * (100 -  item.discountPercentage)/100)*item.quantity
        sum+= item.totalPrice
    }
    order.totalPrice = sum
    // console.log(order)
    res.render("client/pages/checkout/success", {
        title: "Đặt hàng thành công",
        order: order
    })
}