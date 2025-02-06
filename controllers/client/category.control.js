const Category = require("../../model/category.model")
const Product = require("../../model/product.model")
const newPrice = require("../../helpers/product")

module.exports.slug = async (req, res) => {
    // console.log(req.params)
    const category = await Category.findOne(
        {
            slug: req.params.slug,
            deleted: false
        }
    )
    const getSubCategory = async (parentId) => {
        const subs = await Category.find(
            {
                parent_id: parentId,
                status: "active",
                deleted: false
            }
        )
        if (subs.length === 0) return [];
        let allSub = [...subs]

        for (const item of subs){
            const child = await getSubCategory(item.id);
            allSub = allSub.concat(child);
        }
        return allSub
    }

    const allSub = await getSubCategory(category.id)
    // console.log(allSub)
    const listId = [category.id]
    for (const item of allSub){
        listId.push(item.id)
    }
    // console.log(listId)
    const product = await Product.find(
        {
            product_category_id: {$in: listId},
            deleted: false
        }
    ).sort({position: "desc"})

    const newProduct = newPrice.newPrice(product)
    res.render("client/pages/category/index.pug", {
        title: "Sản phẩm",
        product: newProduct,
        categorys: category
    })
}