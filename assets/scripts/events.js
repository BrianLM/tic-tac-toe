'use strict'
const getFormFields = require('../../lib/get-form-fields')

const cellClick = function (event) {
  const cellIndex = +(this.attributes['data-index'].value)
  const cell = $('div[data-index="' + cellIndex + '"]')
  const currentPlayer = $('#gameboard').attr('data-player')
  if (cell.attr('data-move') === '') {
    cell.attr('data-move', currentPlayer)
    cell.append('<img src="' + turnIndicator() + '" alt="' + currentPlayer + '" class="cell-size">')
    finishTurn()
  }
}

const turnIndicator = function () {
  const currentPlayer = $('#gameboard').attr('data-player')
  if (currentPlayer === 'x') {
    return 'http://www.clker.com/cliparts/e/0/f/4/12428125621652493290X_mark_18x18_02.svg.med.png'
  } else {
    return 'https://thecliparts.com/wp-content/uploads/2016/12/drawing-letter-o-clipart.png'
  }
}

const finishTurn = function () {
  const board = $('#gameboard')
  const currentPlayer = $('#gameboard').attr('data-player')
  if (currentPlayer === 'x') {
    board.attr('data-player', 'o')
  } else {
    board.attr('data-player', 'x')
  }
  $('#turn').attr('src', turnIndicator())
}

const modalTest = function (event) {
  event.preventDefault()
  const modalTarget = $('#' + event.target.attributes['data-modal'].value + '')
  const data = getFormFields(event.target)
  console.log(data)
  modalTarget.modal('hide')
}

const addHandlers = function () {
  $('div[data-move]').on('click', cellClick)
  $('#signup').on('submit', modalTest)
  $('#signin').on('submit', modalTest)
  $('#change-password').on('submit', modalTest)
}

module.exports = {
  addHandlers
}
