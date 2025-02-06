const  express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/category.control")

router.get("/:slug", controller.slug)

module.exports = router