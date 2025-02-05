const express = require("express")
const multer = require("multer")
const router = express.Router()
const controller = require("../../controllers/admin/account.control")
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")

router.get("/", controller.account)

router.get("/create", controller.create)
router.post("/create", upload.single("avatar"),uploadCloud.upload,controller.createAccount)

module.exports = router