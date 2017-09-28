'use strict'
// const store = require('../store.js')
const game = require('../game.js')
const events = require('../events.js')
const api = require('./api')

const onCreateSuccess = function (response, status, xhr) {
  console.log('Create game success UI response', response)
  console.log('Create game success UI status', status)
  console.log('Create game success UI xhr', xhr)
  game.game = response.game
  setTiles()
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
  setTiles()
}

const onMoveFailure = function (response, status, xhr) {
  console.log('Move failure UI response', response)
  console.log('Move failure UI status', status)
  console.log('Move failure UI xhr', xhr)
}

const onFinishSuccess = function (response, status, xhr) {
  console.log('Move success UI response', response)
  console.log('Move success UI status', status)
  console.log('Move success UI xhr', xhr)
  const board = $('#gameboard').attr('data-player')
  $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(board) + '" alt="X">')
}

const onFinishFailure = function (response, status, xhr) {
  console.log('Move failure UI response', response)
  console.log('Move failure UI status', status)
  console.log('Move failure UI xhr', xhr)
}

const setTiles = function () {
  console.log(api)
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
    api.updateGame(game)
      .then(onFinishSuccess)
      .catch(onFinishFailure)
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
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[0] === state[4] && state[0] === state[8] && state[0] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[0] === state[3] && state[0] === state[6] && state[0] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[1] === state[4] && state[1] === state[7] && state[1] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[2] === state[4] && state[2] === state[6] && state[2] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[2] === state[5] && state[2] === state[8] && state[2] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[3] === state[4] && state[3] === state[5] && state[3] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  } else if (state[6] === state[7] && state[6] === state[8] && state[6] !== '') {
    $('div[data-move]').off('click', events.cellClick)
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="X">')
    game.game.over = 'true'
  }
}

module.exports = {
  onCreateSuccess,
  onCreateFailure,
  onMoveSuccess,
  onMoveFailure,
  onFinishSuccess,
  onFinishFailure
}
