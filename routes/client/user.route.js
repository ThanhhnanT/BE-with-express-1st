const  express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/user.control")
const multer = require('multer')
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")

router.get("/register", controller.register)
router.get("/login", controller.login)
router.get("/logout", controller.logout)
router.get("/password/forgot", controller.forgotPassword)
router.get("/password/otp", controller.otpPassword)
router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", upload.none(),controller.postResetPassword)
router.post("/password/otp",upload.none(), controller.postOtpPassword)
router.post("/password/forgot", upload.none(),controller.postForgotPassword)
router.post("/login", upload.none(), controller.postLogin)
router.post("/register", upload.none(),controller.postRegister)


// Bạn bè
router.get("/not-friend", controller.notFriend)
router.get("/request", controller.request)
router.get("/accept", controller.accept)
router.get("/friend", controller.friend)

module.exports = router