const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/product.control")

router.get("/", controller.index)

router.get("/change-status/:status/:id", controller.changeStatus)

router.get("/change-multi", controller.changeMulti)

router.get("/delete/:id", controller.delete)
module.exports = router
