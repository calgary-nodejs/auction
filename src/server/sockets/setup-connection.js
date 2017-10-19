'use strict'

const { Observable } = require('rxjs')
const { getLotById, placeBid } = require('../facades/lot')
const errorHandler = require('./error-handler')
const crypto = require('crypto')

let watchCount = 0 // TODO: major limitation -- this implementation assumes there is only one item!

const generateName = value => crypto
      .createHash('md5')
      .update(value)
      .digest("hex")
      .substr(0, 12) + '...'

const setupConnection = io => socket => {
  const bidder = generateName(socket.id)

  watchCount++
  emitWatchCount(io, watchCount)

  const newBid$ = Observable.fromEvent(socket, 'new_bid')
        .map(bid => Object.assign(bid, { bidder }))

  const biddingForLot$ = newBid$
    .map(bid => Observable.from(getLotById(bid.lotId)))
    .mergeAll()

  socket.on('disconnect', () => {
    watchCount--
    emitWatchCount(io, watchCount)
  })

  return biddingForLot$
    .withLatestFrom(
      newBid$,
      (lot, bid) => Observable.from(placeBid(bid, lot)))
    .mergeAll()
    .catch(errorHandler(socket))
    .do(bid => io.emit('new_bid_placed', bid))
}

function emitWatchCount(io, watchCount) {
  io.emit('watch_count', watchCount - 1) //decrement by 1 as the current user should be excluded from count (alternatively, this can be done on client)
}

module.exports = setupConnection
