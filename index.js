const express = require('express')
const app = express()
require('dotenv').config()

const route = require('./routes/client/index.route')
const routeAdmin = require("./routes/admin/index.route")

const cookieParser = require("cookie-parser")
const session = require("express-session")
const systemConfig = require("./config/system")
const flash = express("express-flash")
const bodyParser = require("body-parser")
const database = require("./config/database")
var methodOverride = require('method-override')
database.connect()

const port = process.env.PORT

app.use(express.static(`${__dirname}/public`))

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Route
routeAdmin(app)
route(app)

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
// app.use(cookieParser('KJGFHHFGH'));
// app.use(session({ cookie: { maxAge: 60000 }}));
// app.use(flash());

app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.MONGO_URL}`)
})
