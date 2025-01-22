const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Bai2');
const route = require('./routes/client/index.route')
const app = express()
const port = 3000

// const Product = mongoose.model('Product', {
//     title: String,
//     price: Number,
//     thumbnail: String
// })

route(app)

app.set('views', './views')
app.set('view engine', 'pug')



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
