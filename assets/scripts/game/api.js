'use strict'
const config = require('../config')
const store = require('../store.js')

const startNewGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  startNewGame
}
