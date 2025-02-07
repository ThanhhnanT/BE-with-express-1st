const express = require("express")
const multer = require("multer")
const router = express.Router()
const controller = require("../../controllers/admin/setting.control")
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")

router.get("/general", controller.general)
router.post("/general",upload.single("logo"), uploadCloud.upload ,controller.postGeneral)

module.exports = router