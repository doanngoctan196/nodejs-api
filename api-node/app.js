const express = require('express')
const app = express()
// const morgan = require("morgan");
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
require('dotenv').config()
const depositRouter = require('./routers/deposit-api')
const userRouter = require('./routers/user-api')
const withdrawRouter = require('./routers/withdraw-api')
const transferRouter = require('./routers/transfer-api')
const database = require('./configuration/database')
// mongoose.set('useCreateIndex', true)
// // Connect to Mongoose and set connection variable
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// var db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('connected to database'))
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
database.initDatabase()
console.log('connect to database')
// Routes which should handle requests

app.use('/user', userRouter)
app.use('/deposit', depositRouter)
app.use('/withdraw', withdrawRouter)
app.use('/transfer', transferRouter)
app.use((req, res, next) => {
    // const error = new Error("Not found");
    // error.status = 404;
    // next(error);
})

app.use((error, req, res, next) => {
    // res.status(error.status || 500);
    // res.json({
    //   error: {
    //     message: error.message
    //   }
    // });
})

module.exports = app
