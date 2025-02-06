const express = require('express')
const app = express()
require('dotenv').config()
const path= require('path')
const route = require('./routes/client/index.route')
const routeAdmin = require("./routes/admin/index.route")
const moment = require("moment")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const systemConfig = require("./config/system")
const flash = express("express-flash")
const bodyParser = require("body-parser")
const database = require("./config/database")
var methodOverride = require('method-override')
database.connect()

app.use(cookieParser());
const port = process.env.PORT

app.use(express.static(`${__dirname}/public`))

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment
//Route
routeAdmin(app)
route(app)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use("/tinymce", express.static(path.join(__dirname, 'node_modules', 'tinymce')))


app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.MONGO_URL}`)
})
