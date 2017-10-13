'use strict'

const { Observable } = require('rxjs')
const { getLotById, placeBid } = require('../facades/lot')
const errorHandler = require('./error-handler')
const crypto = require('crypto')

const generateName = value => crypto
      .createHash('md5')
      .update(value)
      .digest("hex")
      .substr(0, 12) + '...'

const setupConnection = io => socket => {
  const bidder = generateName(socket.id)

  const newBid$ = Observable.fromEvent(socket, 'new_bid')
        .map(bid => Object.assign(bid, { bidder }))

  const biddingForLot$ = newBid$
    .map(bid => Observable.from(getLotById(bid.lotId)))
    .mergeAll()

  return biddingForLot$
    .withLatestFrom(
      newBid$,
      (lot, bid) => Observable.from(placeBid(bid, lot)))
    .mergeAll()
    .catch(errorHandler(socket))
    .do(bid => io.emit('new_bid_placed', bid))
}

module.exports = setupConnection
