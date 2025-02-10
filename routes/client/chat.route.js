const  express = require('express')
const router = express.Router()
const controller = require("../../controllers/client/chat.control")
const chatMiddleware = require("../../middleware/client/chat.middleware")


router.get("/:roomId",chatMiddleware.isAccess ,controller.chat)

module.exports = router