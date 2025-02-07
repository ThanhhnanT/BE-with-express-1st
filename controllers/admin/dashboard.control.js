const Product = require("../../model/product.model")
const User = require("../../model/user.model")
const Category = require("../../model/category.model")
const Account = require("../../model/account.model")


module.exports.dashboard = async (req, res) => {
    const statistic = {
        category: {
            total: 0,
            active: 0,
            nonActive: 0,
        },
        product : {
            total: 0,
            active: 0,
            nonActive: 0,
        },
        account: {
            total: 0,
            active: 0,
            nonActive: 0,
        },
        user: {
            total: 0,
            active: 0,
            nonActive: 0,
        },
    }
    statistic.category.total = await Category.countDocuments({
        deleted: false
    })
    statistic.category.active = await Category.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.category.nonActive = await Category.countDocuments({
        deleted: false,
        status: "non-active"
    })
    statistic.account.total = await Account.countDocuments({
        deleted: false
    })
    statistic.account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.account.nonActive = await Account.countDocuments({
        deleted: false,
        status: "non-active"
    })
    statistic.product.total = await Product.countDocuments({
        deleted: false
    })
    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.product.nonActive = await Product.countDocuments({
        deleted: false,
        status: "non-active"
    })
    statistic.user.total = await User.countDocuments({
        deleted: false
    })
    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    })
    statistic.user.nonActive = await User.countDocuments({
        deleted: false,
        status: "non-active"
    })
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        item: statistic
    })
}