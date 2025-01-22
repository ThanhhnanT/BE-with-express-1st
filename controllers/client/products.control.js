module.exports.products = (req, res ) => {
    res.render('client/pages/product/product', {
        title: 'Sản phẩm',
    })
    res.send('Xin chào')
}