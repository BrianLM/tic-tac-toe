'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')
const gameAPI = require('./game/api')
const gameUI = require('./game/ui')
const game = require('./game')
// const store = require('./store')

const onInvite = function () {
  if (game.game !== undefined) {
    $('#inviteContent').html('<p>Your game number is ' + game.game.id + '.</p>')
    gameUI.onInviteRequest()
  } else {
    $('#inviteContent').html('<p>You must be in a game to invite someone.</p>')
  }
}

const cellClick = function (event) {
  const cellIndex = +(this.attributes['data-index'].value)
  const cell = $('div[data-index="' + cellIndex + '"]')
  const currentPlayer = $('#gameboard').attr('data-player')
  const playingAs = $('#player').attr('data-tag')
  const haveOpponent = $('#opponent').attr('data-tag')
  const data = {'game': {'cell': { 'index': cellIndex, 'value': currentPlayer }, 'over': 'false'}}
  if (cell.attr('data-move') === '' && !game.game.over && (haveOpponent === 'none' || currentPlayer === playingAs)) {
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
  if ($(window).width() <= 767) {
    $('#siteNavbar').collapse('toggle')
  }
  const gameInPlay = $('#playarea').attr('data-state')
  if (Object.keys(game).length === 0 || gameInPlay === 'true') {
    event.preventDefault()
    gameAPI.startNewGame()
      .then(gameUI.onCreateSuccess)
      .catch(gameUI.onCreateFailure)
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
        break
      }
      case 'save-game': {
        gameAPI.startNewGame()
          .then(gameUI.onCreateSuccess)
          .catch(gameUI.onCreateFailure)
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
      .catch(gameUI.onGetFailure)
    )
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

const aiTurn = function (event) {
  const available = game.game.cells.map((current, index) => current === '' ? index : '').filter(x => x !== '')
  const aiClick = Math.round(Math.random() * (available.length - 1))
  const data = {'game': {'cell': { 'index': available[aiClick], 'value': 'o' }, 'over': 'false'}}
  sendGameUpdate(data)
}

const toggleAI = function (event) {
  event.preventDefault()
  $('#opponent-text').html('You are playing against: <strong>the computer</strong>')
  $('#opponent').attr('data-tag', 'computer')
  if ($('#gameboard').attr('data-player') === 'o') {
    const data = {'game': {'cell': { 'index': 0, 'value': game.game.cells[0] }, 'over': 'false'}}
    sendGameUpdate(data)
  }
}

const tryCollapse = function () {
  if ($(window).width() <= 767) {
    $('#siteNavbar').collapse('toggle')
  }
}

const addHandlers = function () {
  $('div[data-index]').on('click', cellClick)
  $('#sign-out').on('click', signOutUser)
  $('#signup').on('submit', signUpUser)
  $('#signin').on('submit', signInUser)
  $('#change-password').on('submit', changePassword)
  $('#new-game').on('click', startNewGame)
  $('#join-form').on('submit', getGameByID)
  $('#list-games').on('click', getGamesByUser)
  $('#forfeit-game').on('click', startNewGame)
  $('#save-game').on('click', startNewGame)
  $('#opponent-text').on('click', '#ai-on', toggleAI)
  $('#list-modal').on('click', 'button[data-gameid]', getSelectedGame)
  $('#wins').on('keydown', getStatistics)
  $('#wins').on('keypress', aiTurn)
  $('#invite').on('click', onInvite)
  $('.navbar-btn').on('click', tryCollapse)
  $('#change-password-modal').on('hidden.bs.modal', function () {
    $('#changeComment').empty()
  })
}

module.exports = {
  addHandlers,
  cellClick
}
