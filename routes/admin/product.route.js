const express = require("express")
const multer = require('multer');
const router = express.Router()
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({storage: storageMulter()})

const controller = require("../../controllers/admin/product.control")

router.get("/", controller.index)

router.get("/change-status/:status/:id", controller.changeStatus)

router.get("/change-multi", controller.changeMulti)

router.get("/delete/:id", controller.delete)

router.get("/create", controller.create)
router.post("/create",upload.single("thumbnail"), controller.createPost)

module.exports = router
