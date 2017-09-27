'use strict'

const cellClick = function (event) {
  const index = event.target.attr('data-index')
  console.log(index)
}

const addHandlers = function () {
  $('div[data-move]').on('click', cellClick)
}

module.exports = {
  addHandlers
}
