const dashboard = require("./dashboard.route")
const product = require("./product.route")
const category = require("./category.route")
const systemConfig = require("../../config/system")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboard)
    app.use(PATH_ADMIN + "/product", product)
    app.use(PATH_ADMIN + "/category", category)
}