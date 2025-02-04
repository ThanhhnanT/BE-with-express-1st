const Category = require("../../model/category.model")
const systemConfig = require("../../config/system")

module.exports.category = async (req, res) => {
    // console.log(Category)
    let find = {
        deleted: false
    }

    const createTree = (arr, parent_id = "") => (
        arr
            .filter(item => item.parent_id === parent_id)
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
    // newCategory.map(item => {
    //     console.log(item._doc)
    // })
    // console.log(newCategory)
    res.render("admin/pages/category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
        category: newCategory
    })
}

module.exports.createCategory = async (req, res) => {
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

// Edit
module.exports.edit = async (req, res) => {
    try{
        const category = await Category.find({
            deleted: false,
            _id: req.params.id
        })
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
        // console.log(newCategory)
        res.render("admin/pages/category/edit.pug", {
            pageTitle: "Chỉnh sửa danh mục",
            item: category,
            category: newCategory
        })
    } catch (e) {
        res.redirect(`${systemConfig.prefixAdmin}/category`)
    }
}

// Patch Edit
module.exports.patchEdit = async (req, res) => {
    try {
        // console.log(req.body.position)
        req.body.position = parseInt(req.body.position)
        // console.log(req.body)
        await Category.updateOne({ _id: req.params.id }, req.body)
        res.redirect("back")
    } catch (e) {
        console.error("Error")
    }
}