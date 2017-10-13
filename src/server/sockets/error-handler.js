'use strict'

const errorHandler = socket => (error, caught) => {
  socket.emit('new_bid_error', { message: error.message })
  return caught
}

module.exports = errorHandler
