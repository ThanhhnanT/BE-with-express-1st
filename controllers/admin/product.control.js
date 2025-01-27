const Product = require("../../model/product.model")
const fliterStatusHelper = require("../../helpers/filterStatus")
const filterStatus = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
module.exports.index = async (req, res) => {
    // console.log(req)
    let find = {
        deleted: false,
    }
    // console.log(searchHelper)

    // Bo loc
    const filterStatus = fliterStatusHelper(req);

    req.query.status ? (find.status = req.query.status) : ("")
    
    // search
    const objectSearch = searchHelper(req);
    if(req.query.title){
        find.title = objectSearch.regex
    }
    
    // Pagination
    const countProduct = await Product.countDocuments(find)
    let objectPagination = await paginationHelper(
        req,
        {
            limitItem: 4,
            currentPage: 1
        },
        countProduct
    )
    // console.log(countProduct)
    
    // End Pagination
    // console.log(objectPagination)
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

module.exports.changeStatus = async(req,res) => {
    // console.log(req.params)
    const status = req.params.status
    const id = req.params.id
    // console.log(status, id)
    await Product.updateOne({_id:id}, {status: status})
    res.redirect("back")
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.query.type)
    const type = req.query.type
    const ids = req.query.ids.split(", ");
    console.log(req.query)
    switch (type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "non-active":
            await Product.updateMany({_id: {$in: ids}}, {status: "non-active"});
            break
    }
    res.redirect("back")
}


// Delete item
module.exports.delete = async(req, res) => {
    // res.send("OKE")
    // console.log(req.params.id)
    const id = req.params.id
    await Product.updateOne({_id:id}, {deleted: true})
    res.redirect("back")
}