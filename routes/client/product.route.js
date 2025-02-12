const express = require('express')
const router = express.Router()
const controller = require('../../controllers/client/products.control.js')

router.get('/', controller.products)

router.get('/:slug', controller.detail)


module.exports = router