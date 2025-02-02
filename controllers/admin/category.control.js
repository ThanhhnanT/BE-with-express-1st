const Category = require("../../model/category.model")
const systemConfig = require("../../config/system")

module.exports.category = async (req, res) => {
    // console.log(Category)
    let find = {
        deleted: false
    }

    const createTree = (arr, parent_id="") => (
        arr 
            .filter (item => item.parent_id === parent_id)
            .map(item => ({
                ...item,
                children: createTree(arr, item.id)
            }))
    )

    const category = await Category.find(find)
    const newCategory = createTree(category)
    // console.log(newCategory)
    // console.log(category)
    res.render("admin/pages/category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        category: newCategory
    }
    )
}

// Create category
module.exports.create =async (req, res) => {
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
    // newCategory.map(item => {
    //     console.log(item._doc)
    // })
    // console.log(newCategory)
    res.render("admin/pages/category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
        category: newCategory
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

    // const record = new Category(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/category`)
}

