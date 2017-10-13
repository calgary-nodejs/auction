'use strict'

const defaultMessage = 'Error occured...'

module.exports = (err, req, res, next) => {
  res.status(err.status || 500).send(err.message || defaultMessage)
}
