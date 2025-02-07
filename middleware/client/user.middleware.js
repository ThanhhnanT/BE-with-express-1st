const User = require("../../model/user.model")

module.exports.user=  async (req, res, next) => {
    if(req.cookies.token) {
        const user = await User.findOne(
            {
                token: req.cookies.token,
                deleted: false
            }
        ).select("-password")
        // console.log(user)
        if(user){
            res.locals.user = user
        }
    }
    next()
} 