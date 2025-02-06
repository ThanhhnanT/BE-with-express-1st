const Category = require("../../model/category.model")

module.exports.category = async (req, res, next) => {
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
    res.locals.category = newCategory
    next()
}