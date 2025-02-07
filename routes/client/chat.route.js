const  express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/chat.control")

router.get("/", controller.chat)

module.exports = router