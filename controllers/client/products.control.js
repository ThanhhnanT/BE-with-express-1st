const Product = require('../../model/product.model')

module.exports.products = async (req, res ) => {
    const product = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"})
    const newProduct = product.map(item => {
        item.priceNew = (item.price - item.price*item.discountPercentage/100).toFixed(2)
        return item
    })

    res.render('client/pages/product/product', {
        title: 'Sản phẩm',
        products: newProduct
    })
    
    
}