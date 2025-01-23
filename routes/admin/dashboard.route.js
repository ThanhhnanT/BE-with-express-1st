const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/dashboard.control")

router.get("/", controller.dashboard)

module.exports = router