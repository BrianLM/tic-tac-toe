'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')
const gameAPI = require('./game/api')
const gameUI = require('./game/ui')
// const game = require('./game')

const cellClick = function (event) {
  const cellIndex = +(this.attributes['data-index'].value)
  const cell = $('div[data-index="' + cellIndex + '"]')
  const currentPlayer = $('#gameboard').attr('data-player')
  const data = {'game': {'cell': { 'index': cellIndex, 'value': currentPlayer }, 'over': 'false'}}
  if (cell.attr('data-move') === '') {
    gameAPI.updateGame(data)
      .then(gameUI.onMoveSuccess)
      .catch(gameUI.onMoveFailure)
  }
}

const signOutUser = function (event) {
  event.preventDefault()
  authApi.signOut()
    .then(authUI.signOutSuccess)
    .catch(authUI.signOutFailure)
}

const signInUser = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  authApi.signIn(data)
    .then(authUI.signInSuccess)
    .catch(authUI.signInFailure)
}

const signUpUser = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signUp(data)
    .then(authUI.signUpSuccess)
    .catch(authUI.signUpFailure)
}

const changePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  authApi.changePassword(data)
    .then(authUI.changePasswordSuccess)
    .catch(authUI.changePasswordFailure)
}

const startNewGame = function (event) {
  $('#playarea').removeClass('hidden')
  event.preventDefault()
  gameAPI.startNewGame()
    .then(gameUI.onCreateSuccess)
    .catch(gameUI.onCreateFailure)
}

const addHandlers = function () {
  $('div[data-move]').on('click', cellClick)
  $('#sign-out').on('click', signOutUser)
  $('#signup').on('submit', signUpUser)
  $('#signin').on('submit', signInUser)
  $('#change-password').on('submit', changePassword)
  $('#new-game').on('click', startNewGame)
  $('#old-games')
}

module.exports = {
  addHandlers
}
