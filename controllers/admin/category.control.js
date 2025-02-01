const Category = require("../../model/category.model")
const systemConfig = require("../../config/system")

module.exports.category = async (req, res) => {
    // console.log(Category)
    let find = {
        deleted: false
    }

    const category = await Category.find(find)
    console.log(category)
    res.render("admin/pages/category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        category: category
    }
    )
}

// Create category
module.exports.create =(req, res) => {

    res.render("admin/pages/category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm"
    })
}

module.exports.createCategory = async (req,res) => {
    // console.log(req.body)
    if (req.body.position == "") {
        const count = await Category.countDocuments()
        // console.log(count)
        req.body.position = count + 1
    }
    else {
        req.body.position = parseInt(req.body.position)
    }

    const record = new Category(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/category`)
}

