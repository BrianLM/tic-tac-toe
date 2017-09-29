'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')
const gameAPI = require('./game/api')
const gameUI = require('./game/ui')
const game = require('./game')
// const store = require('./store')

const cellClick = function (event) {
  const cellIndex = +(this.attributes['data-index'].value)
  const cell = $('div[data-index="' + cellIndex + '"]')
  const currentPlayer = $('#gameboard').attr('data-player')
  const data = {'game': {'cell': { 'index': cellIndex, 'value': currentPlayer }, 'over': 'false'}}
  if (cell.attr('data-move') === '' && !game.game.over) {
    sendGameUpdate(data)
  }
}

const sendGameUpdate = function (data) {
  gameAPI.updateGame(data)
    .then(gameUI.onMoveSuccess)
    .catch(gameUI.onMoveFailure)
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
  const gameInPlay = $('#playarea').attr('data-state')
  if (Object.keys(game).length === 0 || gameInPlay === 'true') {
    event.preventDefault()
    gameAPI.startNewGame()
      .then(gameUI.onCreateSuccess)
      .catch(gameUI.onCreateFailure)
    $('div[data-move]').on('click', cellClick)
  } else {
    switch (event.target.id) {
      case 'forfeit-game': {
        const data = {'game': {'cell': { 'index': 0, 'value': game.game.cells[0] }, 'over': 'true'}}
        gameAPI.updateGame(data)
          .then(gameUI.onFinishSuccess)
          .catch(gameUI.onFinishFailure)
          .then(gameAPI.startNewGame)
          .then(gameUI.onCreateSuccess)
          .catch(gameUI.onCreateFailure)
        $('div[data-move]').on('click', cellClick)
        break
      }
      case 'save-game': {
        gameAPI.startNewGame()
          .then(gameUI.onCreateSuccess)
          .catch(gameUI.onCreateFailure)
        $('div[data-move]').on('click', cellClick)
        break
      }
    }
    $('#confirm-new-modal').modal('show')
  }
}

const getGameByID = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  gameAPI.onGetGame(data.game.id)
    .then(gameUI.onGetSuccess)
    .catch(gameAPI.onJoinGame(data.game.id)
      .then(gameUI.onGetSuccess)
    )
  $('#join-modal').modal('hide')
}

const getGamesByUser = function (event) {
  event.preventDefault()
  gameAPI.listGames()
    .then(gameUI.onListSuccess)
    .catch(gameUI.onListFailure)
    .then($('#list-modal').modal('show'))
}

const getSelectedGame = function (event) {
  event.preventDefault()
  const selectedID = event.target.attributes['data-gameid'].value
  gameAPI.onGetGame(selectedID)
    .then(gameUI.onGetSuccess)
    .catch(gameUI.onGetFailure)
  $('#list-modal').modal('hide')
}

const getStatistics = function (event) {
  event.preventDefault()
  gameAPI.getAllGames()
    .then(gameUI.onStatsSuccess)
    .catch(gameUI.onStatsFailure)
}

const addHandlers = function () {
  $('div[data-move]').on('click', cellClick)
  $('#sign-out').on('click', signOutUser)
  $('#signup').on('submit', signUpUser)
  $('#signin').on('submit', signInUser)
  $('#change-password').on('submit', changePassword)
  $('#new-game').on('click', startNewGame)
  $('#join-form').on('submit', getGameByID)
  $('#list-games').on('click', getGamesByUser)
  $('#forfeit-game').on('click', startNewGame)
  $('#save-game').on('click', startNewGame)
  $('#list-modal').on('click', 'button[data-gameid]', getSelectedGame)
  $('#zero').on('change', getStatistics)
  $('#wins').on('keydown', getStatistics)
}

module.exports = {
  addHandlers,
  cellClick
}
