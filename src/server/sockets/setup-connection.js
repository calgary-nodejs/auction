'use strict'

const { Observable } = require('rxjs')
const { getLotById, placeBid } = require('../facades/lot')
const errorHandler = require('./error-handler')
const crypto = require('crypto')

const getNumberOfSockets = io => {
  return Object.keys(io.sockets.sockets).length
}

const generateName = value => crypto
      .createHash('md5')
      .update(value)
      .digest("hex")
      .substr(0, 12) + '...'

const setupConnection = io => socket => {
  const bidder = generateName(socket.id)

  emitWatchCount(io)

  const newBid$ = Observable.fromEvent(socket, 'new_bid')
        .map(bid => Object.assign(bid, { bidder }))

  const biddingForLot$ = newBid$
    .map(bid => Observable.from(getLotById(bid.lotId)))
    .mergeAll()

  socket.on('disconnect', () => {
    emitWatchCount(io)
  })

  return biddingForLot$
    .withLatestFrom(
      newBid$,
      (lot, bid) => Observable.from(placeBid(bid, lot)))
    .mergeAll()
    .catch(errorHandler(socket))
    .do(bid => io.emit('new_bid_placed', bid))
}

function emitWatchCount(io) {
  io.emit('watch_count', getNumberOfSockets(io) - 1) //decrement by 1 as the current user should be excluded from count (alternatively, this can be done on client)
}

module.exports = setupConnection
