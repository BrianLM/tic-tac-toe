'use strict'
const config = require('../config')
const store = require('../store.js')
const game = require('../game.js')

const startNewGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = function (data) {
  console.log(game.game.id)
  return $.ajax({
    url: config.apiOrigin + '/games/' + game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  startNewGame,
  updateGame
}
