const Product = require("../../model/product.model")
const Price = require("../../helpers/product")

module.exports.index = async (req, res) => {
    const keyboard = req.query.keyboard
    if (keyboard) {
        const keyword = new RegExp(keyboard, "i");
        const product = await Product.find(
            {
                title: keyword,
                status: "active",
                deleted: false
            }
        )
        // console.log(product)
        const newProduct =Price.newPrice(product)

        res.render('client/pages/search/index', {
            title: "Kết quả tìm kiếm",
            keyboard: keyboard,
            product: newProduct
        })
    }

}