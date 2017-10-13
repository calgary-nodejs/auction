'use strict'

const { Observable } = require('rxjs')
const setupConnection = require('./setup-connection')

const socketsHandler = (io) => Observable
      .fromEvent(io, 'connection')
      .map(setupConnection(io))
      .mergeAll()
      .subscribe()

module.exports = socketsHandler
