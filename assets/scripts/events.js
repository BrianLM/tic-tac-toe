'use strict'
const getFormFields = require('../../lib/get-form-fields')
const authApi = require('./auth/api')
const authUI = require('./auth/ui')
const gameAPI = require('./game/api')
const gameUI = require('./game/ui')
const game = require('./game')

const cellClick = function (event) {
  const cellIndex = +(this.attributes['data-index'].value)
  const cell = $('div[data-index="' + cellIndex + '"]')
  const currentPlayer = $('#gameboard').attr('data-player')
  const data = {'game': {'cell': { 'index': cellIndex, 'value': currentPlayer }, 'over': 'false'}}
  if (cell.attr('data-move') === '') {
    gameAPI.updateGame(data)
      .then(gameUI.onMoveSuccess)
      .then(setTiles)
      .catch(gameUI.onMoveFailure)
  }
}

const setTiles = function () {
  const state = game.game.cells
  state.forEach(function (current, index) {
    const cell = $('div[data-index="' + index + '"]')
    if (current === 'x') {
      cell.attr('data-move', current)
      cell.html('<img src="' + turnIndicator('x') + '" alt="x" class="cell-size">')
    } else if (current === 'o') {
      cell.attr('data-move', current)
      cell.html('<img src="' + turnIndicator('o') + '" alt="o" class="cell-size">')
    } else {
      cell.attr('data-move', current)
      cell.empty()
    }
  })
  const xMoves = state.filter(x => x === 'x')
  const oMoves = state.filter(o => o === 'o')
  const some = state.some(x => x !== '')
  if (some) {
    checkWinCondition()
  }
  if (game.game.over === false) {
    if (xMoves.length === oMoves.length) {
      finishTurn('x')
    } else {
      finishTurn('o')
    }
  } else {
    gameAPI.updateGame(game)
      .then(gameUI.onFinishSuccess)
      .catch(gameUI.onFinishFailure)
  }
}
const turnIndicator = function (currentPlayer) {
  if (currentPlayer === 'x') {
    return 'http://www.clker.com/cliparts/e/0/f/4/12428125621652493290X_mark_18x18_02.svg.med.png'
  } else {
    return 'https://thecliparts.com/wp-content/uploads/2016/12/drawing-letter-o-clipart.png'
  }
}

const finishTurn = function (currentPlayer) {
  const board = $('#gameboard')
  if (currentPlayer === 'x') {
    board.attr('data-player', 'x')
  } else {
    board.attr('data-player', 'o')
  }
  $('#turn').attr('src', turnIndicator(currentPlayer))
}

const checkWinCondition = function () {
  const state = game.game.cells
  if (state[0] === state[1] && state[0] === state[2] && state[0] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[0] === state[4] && state[0] === state[8] && state[0] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[0] === state[3] && state[0] === state[6] && state[0] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[1] === state[4] && state[1] === state[7] && state[1] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[1]) + '" alt="' + state[1] + '">')
    game.game.over = 'true'
  } else if (state[2] === state[4] && state[2] === state[6] && state[2] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[2]) + '" alt="' + state[2] + '">')
    game.game.over = 'true'
  } else if (state[2] === state[5] && state[2] === state[8] && state[2] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[2]) + '" alt="' + state[2] + '">')
    game.game.over = 'true'
  } else if (state[3] === state[4] && state[3] === state[5] && state[3] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[3]) + '" alt="' + state[3] + '">')
    game.game.over = 'true'
  } else if (state[6] === state[7] && state[6] === state[8] && state[6] !== '') {
    $('div[data-move]').off('click', cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[6]) + '" alt="' + state[6] + '">')
    game.game.over = 'true'
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
    .then(setTiles)
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
