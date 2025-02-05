const Account = require("../../model/account.model")
const md5 = require('md5')
const systemConfig = require("../../config/system")

module.exports.login = async (req,res) => {
    // res.send("oke")
    res.render('admin/pages/auth/login', {
        pageTitle: "Trang đăng nhập"
    })
}

module.exports.loginPost = async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body
    // console.log(password)
    const user = await Account.findOne({
        email: email,
        deleted: false
    })
    // console.log(user)
    if(!user){
        // alert("Email không tồn tại")
        res.redirect("back")
        return
    }

    if(md5(password) != user.password){
        res.redirect("back")
        return
    }

    if (user.status == "non-active"){
        res.redirect("back")
        return
    }
    res.cookie("token", user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

module.exports.logout = async (req, res) => {
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}