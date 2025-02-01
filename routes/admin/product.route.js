const express = require("express")
const multer = require('multer');
const router = express.Router()
const uploadCould = require("../../middleware/admin/uploadCloud")
// const storageMulter = require("../../helpers/storageMulter")
const upload = multer()
const controller = require("../../controllers/admin/product.control")



router.get("/", controller.index)

router.get("/change-status/:status/:id", controller.changeStatus)

router.get("/change-multi", controller.changeMulti)

router.get("/delete/:id", controller.delete)

router.get("/create", controller.create)
router.post("/create", upload.single("thumbnail"),uploadCould.upload, controller.createPost)

router.get("/edit/:_id", controller.edit)
router.post("/edit/change/:id", upload.single("thumbnail"),uploadCould.upload, controller.changeEdit)

router.get("/detail/:id", controller.detail)

// router.get("/", controller.category)

module.exports = router
