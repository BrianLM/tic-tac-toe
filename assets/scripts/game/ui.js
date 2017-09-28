'use strict'
// const store = require('../store.js')
const game = require('../game.js')

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

const setTiles = function () {
  const state = game.game.cells
  state.forEach(function (current, index, array) {
    const cell = $('div[data-index="' + index + '"]')
    if (current === 'x') {
      cell.append('<img src="http://www.clker.com/cliparts/e/0/f/4/12428125621652493290X_mark_18x18_02.svg.med.png" alt="x" class="cell-size">')
    } else if (current === 'y') {
      cell.append('<img src="https://thecliparts.com/wp-content/uploads/2016/12/drawing-letter-o-clipart.png" alt="o" class="cell-size">')
    }
  })
}

module.exports = {
  onCreateSuccess,
  onCreateFailure
}
