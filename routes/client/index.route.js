const productRoute = require('./product.route')
const homeRoute = require('./home.route')
const getCategoryTree = require("../../middleware/client/category.middleware")

module.exports = (app) => {
    app.use(getCategoryTree.category)
    app.use('/', homeRoute)
    app.use('/product' ,productRoute)
}