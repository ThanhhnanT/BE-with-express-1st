const Category = require("../../model/category.model")
const Product = require("../../model/product.model")
const newPrice = require("../../helpers/product")

module.exports.index = async (req, res) => {
    // Lấy sản phẩm nổi bật
        const featureProduct = await Product.find(
            {
                feature: "1",
                deleted: false,
                status: "active"
            }
        )
        const newProduct = newPrice.newPrice(featureProduct)
    
    // Lấy sản phẩm mới
        const newP = await Product.find(
            {
                deleted: false,
                status: "active"
            }
        ).limit(6).sort({position: "desc"})

    res.render('client/pages/home/index', {
        title: 'Trang chủ',
        featureProduct: newProduct,
        newP: newP
    });
}