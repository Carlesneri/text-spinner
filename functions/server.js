const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// app.use(cors())

app.use(cors({
    origin: 'https://text-spinner-279d4.web.app',
    optionsSuccessStatus: 200
}))

// app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/', require('./src/routes'))


module.exports = app