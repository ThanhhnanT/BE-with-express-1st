const Account = require("../../model/account.model")
const systemConfig = require("../../config/system")
const Roles = require("../../model/roles.model")
const md5 = require('md5')

module.exports.account = async (req, res) => {
    const account = await Account.find({
        deleted: false, 
    }).select("-password -token")
    // console.log(account)
    for (const item of account) {
        const role = await Roles.findOne({
            _id: item.role_id,
            deleted:false
        });
        item.role = role
        // console.log(item)
    }
    // console.log(account)
    res.render("admin/pages/account/index.pug", {
        pageTitle: "Danh sách tài khoản",
        account: account
    })
}

module.exports.create = async (req, res) => {
    const roles = await Roles.find({
        deleted: false
    })
    // console.log(roles)
    res.render(`admin/pages/account/create.pug`,{
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}

module.exports.createAccount = async (req, res) => {
    // console.log(req.body)
    req.body.password=md5(req.body.password)

    //Check mail
    const email = req.body.email
    const emailExist = await Account.findOne({
        email: email,
        deleted: false
    })
    if(emailExist){
        res.redirect("back")
    } else {
        const account = new Account(req.body)
        await account.save()
        res.redirect(`${systemConfig.prefixAdmin}/account`)
    }
}

