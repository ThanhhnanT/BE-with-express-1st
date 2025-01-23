const Product = require("../../model/product.model")

module.exports.index = async (req, res) => {
    // console.log(req)
    let filterStatus =[
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "non-active",
            class: ""
        }
    ]
    
    let find ={
        deleted: false
    }

    req.query.status ? (find.status = req.query.status) :("")

    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status==req.query.status)
        filterStatus[index].class="active"
    } else {
         const index = filterStatus.findIndex(item => item.status=="")
        filterStatus[index].class="active"
    }
    const products = await Product.find(find)
    console.log(products)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Admin: Trang sản phẩm",
        product: products,
        filterStatus: filterStatus
    })
}