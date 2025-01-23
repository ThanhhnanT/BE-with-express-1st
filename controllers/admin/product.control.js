const Product = require("../../model/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    })
    console.log(products)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm",
        product: products
    })
}