const express = require("express")
const multer = require("multer")
const router = express.Router()
const controller = require("../../controllers/admin/category.control")
const upload = multer()
const uploadCloud = require("../../middleware/admin/uploadCloud")


router.get("/", controller.category) 

router.get("/create", controller.create) 
router.post("/create",upload.single("thumbnail"),uploadCloud.upload ,controller.createCategory) 

router.get("/edit/:id", controller.edit) 
router.post("/edit/:id",upload.single("thumbnail"),uploadCloud.upload, controller.patchEdit)
module.exports = router