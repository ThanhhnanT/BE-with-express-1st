module.exports.newPrice = (product) => {
    const newProduct = product.map(item => {
        item.priceNew = (item.price - item.price * item.discountPercentage / 100).toFixed(2)
        return item
    })
    return newProduct
}