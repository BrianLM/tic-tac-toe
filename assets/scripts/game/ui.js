'use strict'
// const store = require('../store.js')
const game = require('../game.js')

const onCreateSuccess = function (response, status, xhr) {
  console.log('Create game success UI response', response)
  console.log('Create game success UI status', status)
  console.log('Create game success UI xhr', xhr)
  game.game = response.game
}

const onCreateFailure = function (response, status, xhr) {
  console.log('Create game failure UI response', response)
  console.log('Create game failure UI status', status)
  console.log('Create game failure UI xhr', xhr)
}

const onMoveSuccess = function (response, status, xhr) {
  console.log('Move success UI response', response)
  console.log('Move success UI status', status)
  console.log('Move success UI xhr', xhr)
  game.game = response.game
}

const onMoveFailure = function (response, status, xhr) {
  console.log('Move failure UI response', response)
  console.log('Move failure UI status', status)
  console.log('Move failure UI xhr', xhr)
}

const onFinishSuccess = function (response, status, xhr) {
  console.log('Finish Success UI response', response)
  console.log('Finish Success UI status', status)
  console.log('Finish Success UI xhr', xhr)
}

const onFinishFailure = function (response, status, xhr) {
  console.log('Finish failure UI response', response)
  console.log('Finish failure UI status', status)
  console.log('Finish failure UI xhr', xhr)
}

const onGetSuccess = function (response, status, xhr) {
  console.log('Get success UI response', response)
  console.log('Get success UI status', status)
  console.log('Get success UI xhr', xhr)
  game.game = response.gameA
  $('#input-join').val('')
}

const onGetFailure = function (response, status, xhr) {
  console.log('Get failure UI response', response)
  console.log('Get failure UI status', status)
  console.log('Get failure UI xhr', xhr)
}

const onListSuccess = function (response, status, xhr) {
  console.log('List Success UI response', response)
  console.log('List Success UI status', status)
  console.log('List Success UI xhr', xhr)
}

const onListFailure = function (response, status, xhr) {
  console.log('List failure UI response', response)
  console.log('List failure UI status', status)
  console.log('List failure UI xhr', xhr)
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onMoveSuccess,
  onMoveFailure,
  onFinishSuccess,
  onFinishFailure,
  onListSuccess,
  onListFailure,
  onGetSuccess,
  onGetFailure
}
