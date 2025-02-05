const express = require('express')
const { prefixAdmin } = require('../../config/system')
const route = express.Router()
const multer = require('multer')
const controller = require('../../controllers/admin/permission.control')
const upload = multer()

route.get(`/`, controller.permission)
route.get(`/create`, controller.create)
route.post(`/create`, upload.none(), controller.createPermission)

route.get(`/roles`, controller.permissionRoles)
route.post(`/roles`, upload.none(),controller.postRoles)

module.exports = route