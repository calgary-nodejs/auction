'use strict'

const express = require( 'express')
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app
  .use(express.static('public'))
  .use(bodyParser.json())
  .use('/api', require('./routes'))
  .use(require('./routes/middleware/error-handler'))

server.listen(8000)

require('./sockets')(io)
