module.exports.index = (req, res) => {
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm"
    })
}