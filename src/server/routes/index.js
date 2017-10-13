'use strict'

const router = require('express').Router()
const { getLotById } = require('../facades/lot')

const ERROR_404 = {
  status: 404,
  message: 'Not Found'
}

router.get('/lots/:id', (req, res, next) => {
  getLotById(req.params.id)
    .then(lot => res.send(lot))
    .catch(err => next(ERROR_404))
})

module.exports = router
