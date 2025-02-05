const Product = require("../../model/product.model")
const fliterStatusHelper = require("../../helpers/filterStatus")
const filterStatus = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const systemConfig = require("../../config/system")
const Category = require("../../model/category.model")


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
    if (req.query.title) {
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

    // Sort
    let sort = {}
    if (req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }
    
    
    
    // console.log(objectPagination)
    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sort)
    console.log(products)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// Change status
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params)
    const status = req.params.status
    const id = req.params.id
    // console.log(status, id)
    await Product.updateOne({ _id: id }, { status: status })
    res.redirect("back")
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.query.type)
    const type = req.query.type
    const ids = req.query.ids.split(", ");
    // console.log(req.query)
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "non-active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "non-active" });
            break
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
        case "change-position":
            // console.log(ids)
            for (item of ids) {
                let [id, position] = item.split("-");
                // console.log(position)
                position = parseInt(position)
                await Product.updateOne({ _id: id }, {
                    position: position
                })
            }
    }
    res.redirect("back")
}


// Delete item
module.exports.delete = async (req, res) => {
    // res.send("OKE")
    // console.log(req.params.id)
    const id = req.params.id
    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedAt: new Date()
        }

    )
    res.redirect("back")
}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const createTree = (arr, parent_id = "") =>
        arr
            .filter(item => item.parent_id === parent_id)
            .map(item => ({
                ...item,
                children: createTree(arr, item.id)
            }));

    const category = await Category.find(find)
    const newCategory = createTree(category)
    res.render("admin/pages/product/create", {
        pageTitle: "Thêm sản phẩm mới",
        category: newCategory
    })
}

module.exports.edit = async (req, res) => {
    try {
        // console.log(req.params)
        const editProduct = await Product.findOne(
            {
                deleted: false,
                _id: req.params._id
            }
        )

        let find = {
            deleted: false
        }
    
        const createTree = (arr, parent_id = "") =>
            arr
                .filter(item => item.parent_id === parent_id)
                .map(item => ({
                    ...item,
                    children: createTree(arr, item.id)
                }));
    
        const allCategory = await Category.find(find)
        const newCategory = createTree(allCategory)
        // console.log(editProduct)
        res.render("admin/pages/product/edit", {
            pageTitle: "Chỉnh sửa sản phẩm ",
            item: editProduct,
            category: newCategory
        })
    }catch(e){
        res.redirect(`${systemConfig.prefixAdmin}/product`)
    }
}

//Create post
module.exports.createPost = async (req, res) => {
    // console.log(req.body)
    if (!req.body.title) {
        req.redirect("back")
        return
    }
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        const count = await Product.countDocuments()
        console.log(count)
        req.body.position = count + 1
    }
    else {
        req.body.position = parseInt(req.body.position)
    }
    // console.log(req.file, req.body)
    // if (req.file) 
    // req.body.deleted = false
    const product = new Product(req.body)
    // console.log(product)
    await product.save()
    // console.log(req.body)
    res.redirect(`${systemConfig.prefixAdmin}/product`)
}

// Edit product
module.exports.changeEdit = async(req,res) => {
    // res.send("Ok")
    // console.log(req.query)
    const id = req.params.id
    // console.log("_____________")
    // console.log(req.file)
    // if (req.file) 

    // console.log(req.body)
    // console.log(req.params)
    await Product.updateOne({_id: id}, req.body)
    res.redirect(`${systemConfig.prefixAdmin}/product`)
}


// Detail
module.exports.detail = async (req, res) => {
    
        // console.log(req.params)
        const detailProduct = await Product.findOne(
            {
                deleted: false,
                _id: req.params.id
            }
        )
        // console.log(detailProduct)
        res.render("admin/pages/product/detail", {
            pageTitle: "Chi tiết sản phẩm: " + detailProduct.title,
            item: detailProduct
        })
    
}

