const express = require('express')
require('dotenv').config()
const route = require('./routes/client/index.route')
const routeAdmin = require("./routes/admin/index.route")
const app = express()
const systemConfig = require("./config/system")
const database = require("./config/database")
var methodOverride = require('method-override')
database.connect()

const port = process.env.PORT

app.use(express.static('public'))

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Route
routeAdmin(app)
route(app)

app.use(methodOverride('_method'))
app.set('views', './views')
app.set('view engine', 'pug')



app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.MONGO_URL}`)
})
