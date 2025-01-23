const Product = require("../../model/product.model")
const fliterStatusHelper = require("../../helpers/filterStatus")
const filterStatus = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

module.exports.index = async (req, res) => {
    // console.log(req)
    let find = {
        deleted: false,
    }
    console.log(searchHelper)
    // Bo loc
    const filterStatus = fliterStatusHelper(req);
    // console.log(filterStatus)
    req.query.status ? (find.status = req.query.status) : ("")
    
    // search
    const objectSearch = searchHelper(req);
    // console.log(objectSearch)
    if(req.query.title){
        find.title = objectSearch.regex
    }
    
    const products = await Product.find(find)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}