const express = require("express")
const multer = require('multer');
const router = express.Router()
const upload = multer()

const controller = require("../../controllers/admin/product.control")

router.get("/", controller.index)

router.get("/change-status/:status/:id", controller.changeStatus)

router.get("/change-multi", controller.changeMulti)

router.get("/delete/:id", controller.delete)

router.get("/create", controller.create)
router.post("/create",upload.none(), controller.createPost)

module.exports = router
