const express = require("express")
const multer = require("multer")
const router = express.Router()
const controller = require("../../controllers/client/cart.control")
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")

router.post("/add/:id", upload.none(), controller.postCart)


module.exports = router