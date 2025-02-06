const Category = require("../../model/category.model")

module.exports.index = async (req, res) => {
   
    // console.log(newCategory)

    res.render('client/pages/home/index', {
        title: 'Trang chủ',
        category: res.locals.category
    });
}