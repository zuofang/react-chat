const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)

app.listen(9093, () => {
    console.log('Node app start at port 9093')
})