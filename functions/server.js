const express = require('express')

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/', require('./src/routes'))


module.exports = app