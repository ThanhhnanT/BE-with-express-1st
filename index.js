const express = require('express')
require('dotenv').config()
const route = require('./routes/client/index.route')
const app = express()
const database = require("./config/database")
database.connect()

const port = process.env.PORT

app.use(express.static('public'))
route(app)


app.set('views', './views')
app.set('view engine', 'pug')



app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.MONGO_URL}`)
})
