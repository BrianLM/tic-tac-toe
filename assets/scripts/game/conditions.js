'use strict'
const game = require('../game.js')
const gameAPI = require('./api')

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
    $('#playarea').attr('data-state', 'false')
    if (xMoves.length === oMoves.length) {
      finishTurn('x')
    } else {
      finishTurn('o')
    }
  } else {
    $('#playarea').attr('data-state', 'true')
    $('#wins').trigger('keydown')
    gameAPI.updateGame(game)
  }
}

const checkWinCondition = function () {
  const state = game.game.cells
  const tie = state.every(x => x !== '')
  if (state[0] === state[1] && state[0] === state[2] && state[0] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[0] === state[4] && state[0] === state[8] && state[0] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[0] === state[3] && state[0] === state[6] && state[0] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[0]) + '" alt="' + state[0] + '">')
    game.game.over = 'true'
  } else if (state[1] === state[4] && state[1] === state[7] && state[1] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[1]) + '" alt="' + state[1] + '">')
    game.game.over = 'true'
  } else if (state[2] === state[4] && state[2] === state[6] && state[2] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[2]) + '" alt="' + state[2] + '">')
    game.game.over = 'true'
  } else if (state[2] === state[5] && state[2] === state[8] && state[2] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[2]) + '" alt="' + state[2] + '">')
    game.game.over = 'true'
  } else if (state[3] === state[4] && state[3] === state[5] && state[3] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[3]) + '" alt="' + state[3] + '">')
    game.game.over = 'true'
  } else if (state[6] === state[7] && state[6] === state[8] && state[6] !== '') {
    $('#gamestate').html('Winner!<img id="turn" class="turn-img" src="' + turnIndicator(state[6]) + '" alt="' + state[6] + '">')
    game.game.over = 'true'
  } else if (tie) {
    $('#gamestate').html('Oops, its a tie!')
    game.game.over = 'true'
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
    $('#gamestate').html('Current move:<img id="turn" class="turn-img" src="' + turnIndicator(currentPlayer) + '" alt="' + currentPlayer + '">')
  } else {
    board.attr('data-player', 'o')
    $('#gamestate').html('Current move:<img id="turn" class="turn-img" src="' + turnIndicator(currentPlayer) + '" alt="' + currentPlayer + '">')
  }
}

const getGameWinner = function (array) {
  const tie = array.every(x => x !== '')
  if (array[0] === array[1] && array[0] === array[2] && array[0] !== '') {
    return array[0]
  } else if (array[0] === array[4] && array[0] === array[8] && array[0] !== '') {
    return array[0]
  } else if (array[0] === array[3] && array[0] === array[6] && array[0] !== '') {
    return array[0]
  } else if (array[1] === array[4] && array[1] === array[7] && array[1] !== '') {
    return array[1]
  } else if (array[2] === array[4] && array[2] === array[6] && array[2] !== '') {
    return array[2]
  } else if (array[2] === array[5] && array[2] === array[8] && array[2] !== '') {
    return array[2]
  } else if (array[3] === array[4] && array[3] === array[5] && array[3] !== '') {
    return array[3]
  } else if (array[6] === array[7] && array[6] === array[8] && array[6] !== '') {
    return array[6]
  } else if (tie) {
    return 0
  }
}

module.exports = {
  setTiles,
  getGameWinner
}
