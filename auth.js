require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//Initiate Mongo Connection
require('./models/mongooseConnection')()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
//Router
const router = require('./routers/router.js')

app.use('/auth', router)

app.listen(PORT, (req, res) => {
    console.log(`Listening at port: ${PORT}`)
})