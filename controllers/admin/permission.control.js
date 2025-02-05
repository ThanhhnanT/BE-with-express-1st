const Roles = require("../../model/roles.model")
const systemConfig = require("../../config/system")
module.exports.permission = async (req, res) => {
    const find ={
        deleted: false
    }

    const roles =  await Roles.find(find)
    // console.log(roles)
    res.render("admin/pages/permission/index.pug", {
        pageTitle: "Phân quyền",
        permission: roles
    })
}

// create page
module.exports.create = async (req, res) => {
    res.render(`admin/pages/permission/create`, {
        pageTitle: 'Tạo nhóm quyền mới'
    })
}

// create permission
module.exports.createPermission = async (req,res) => {
    // console.log(req.body)
    const data = new Roles(req.body)
    await data.save()
    res.redirect(`${systemConfig.prefixAdmin}/permission`)
    // await Roles.create(data)
}

// Permission Roles
module.exports.permissionRoles = async (req, res) => {
    const roles = await Roles.find(
        {
            deleted: false
        }
    )
    // console.log(roles)
    
    res.render("admin/pages/permission/roles.pug", {
        pageTitle: "Trang phân quyền",
        roles: roles
    })
}

module.exports.postRoles = async (req,res) => {
    // console.log(req.body)
    const permission = JSON.parse(req.body.permissions)
    // console.log(permission)
    permission.map(async item => {
        const id = item.id
        const permission = item.permissions
        await Roles.updateOne({_id: id}, {permission: permission})
    })
    res.redirect(`back`)
}