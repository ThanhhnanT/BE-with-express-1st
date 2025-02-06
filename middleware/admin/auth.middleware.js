const systemConfig = require("../../config/system")
const Account = require("../../model/account.model")
const Roles = require("../../model/roles.model")

module.exports.requireAuth = async (req, res, next) => {
    // console.log(req.cookies.token)
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    } else {
        const user = await Account.findOne(
            {
                token: req.cookies.token,
                deleted: false
            }
        ).select("-password")
        // console.log(user)
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
            return
        } else{
            const role = await Roles.findOne(
                {
                    _id: user.role_id
                }
            ).select("title permission")
            // console.log(user)
            res.locals.user = user 
            res.locals.role = role 
            next();
        }
    }
    
}