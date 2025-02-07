const express = require("express")
const multer = require("multer")
const router = express.Router()
const controller = require("../../controllers/client/checkout.control")
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")

router.get("/", controller.index)
router.get("/success/:id", controller.success)
router.post("/order", upload.none(),controller.order)

module.exports = router