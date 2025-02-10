const Room = require("../../model/zooms-chat.model")

module.exports.isAccess = async (req, res, next) => {
    try {
        const userId = res.locals.user.id
        const roomId = req.params.roomId

        const isAccessRoom = await Room.findOne({
            _id: roomId,
            deleted: false,
            "users.user_id": userId
        })

        if (!isAccessRoom) {
            res.redirect("/user/friend")
            return
        }
        next()
    } catch(e) {
        res.redirect("/user/friend")
    }
}