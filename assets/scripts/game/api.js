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
  return $.ajax({
    url: config.apiOrigin + '/games/' + game.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const onGetGame = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const listGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/?over=false',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  startNewGame,
  updateGame,
  onGetGame,
  listGames
}
