const dashboard = require("./dashboard.route")
const product = require("./product.route")
const category = require("./category.route")
const permission = require("./permission.route")
const account = require("./account.route")
const auth = require("./auth.route")
const setting = require("./setting.route")
const systemConfig = require("../../config/system")
const requireAuth = require("../../middleware/admin/auth.middleware")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard",requireAuth.requireAuth, dashboard)
    app.use(PATH_ADMIN + "/product",requireAuth.requireAuth, product)
    app.use(PATH_ADMIN + "/category",requireAuth.requireAuth, category)
    app.use(PATH_ADMIN + "/permission",requireAuth.requireAuth, permission)
    app.use(PATH_ADMIN + "/account",requireAuth.requireAuth, account)
    app.use(PATH_ADMIN + "/auth", auth)
    app.use(PATH_ADMIN + "/setting",requireAuth.requireAuth ,setting)
}