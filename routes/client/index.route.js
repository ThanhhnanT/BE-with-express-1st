const productRoute = require('./product.route')
const homeRoute = require('./home.route')
const categoryRoute = require('./category.route')
const searchRoute = require('./search.route')
const cartRoute = require('./cart.route')
const getCategoryTree = require("../../middleware/client/category.middleware")
const cart = require("../../middleware/client/cart.middleware")

module.exports = (app) => {
    app.use(getCategoryTree.category)
    app.use(cart.cartId)
    app.use('/', homeRoute)
    app.use('/cart', cartRoute)
    app.use('/category' ,categoryRoute)
    app.use('/search' ,searchRoute)
    app.use('/product' ,productRoute)
}