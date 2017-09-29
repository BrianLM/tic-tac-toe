'use strict'
const store = require('../store.js')
const game = require('../game.js')
const conditions = require('./conditions.js')

const onCreateSuccess = function (response, status, xhr) {
  console.log('Create game success UI response', response)
  console.log('Create game success UI status', status)
  console.log('Create game success UI xhr', xhr)
  game.game = response.game
  $('#playarea').removeClass('hidden')
  $('#confirm-new-modal').modal('hide')
  conditions.setTiles()
  $('#gamestate').html('Current move:<img id="turn" class="turn-img" src="' + conditions.turnIndicator('x') + '" alt="X">')
  $('#player-tag img').attr('src', conditions.turnIndicator('x')).attr('alt', 'x')
  $('#player').attr('data-tag', 'x')
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
  conditions.setTiles()
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
  game.game = response.game
  $('#input-join').val('')
  conditions.setTiles()
  $('#playarea').removeClass('hidden')
  $('#list-modal').modal('hide')
  if (game.game['player_x'].email === store.user.email) {
    $('#player-tag img').attr('src', conditions.turnIndicator('x')).attr('alt', 'x')
    $('#player').attr('data-tag', 'x')
  } else {
    $('#player-tag img').attr('src', conditions.turnIndicator('o')).attr('alt', 'o')
    $('#opponent-text').html('You are playing against: <strong>' + game.game['player_x'].email + '</strong>')
    $('#player').attr('data-tag', 'o')
  }
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
  game.games = response.games
  const listGameArea = $('#listContent')
  listGameArea.empty()
  const gameAreaForm = $('<form/>')
  game.games.forEach((current, index, array) => {
    if (current['player_o'] === null) {
      gameAreaForm.append('<div><p><button class="btn btn-default btn-md" data-gameid="' + current.id + '">' + current.id + '</button>As player X</p></div>')
    } else {
      gameAreaForm.append('<div><p><button class="btn btn-default btn-md" data-gameid="' + current.id + '">' + current.id + '</button>Player X ' + current['player_x'].email + ' vs. Player O ' + current['player_o'].email + '</p></div>')
    }
  })
  listGameArea.append(gameAreaForm)
}

const onListFailure = function (response, status, xhr) {
  console.log('List failure UI response', response)
  console.log('List failure UI status', status)
  console.log('List failure UI xhr', xhr)
}

const onStatsSuccess = function (response, status, xhr) {
  console.log('Stats Success UI response', response)
  console.log('Stats Success UI status', status)
  console.log('Stats Success UI xhr', xhr)
  game.games = response.games
  let win = 0
  let loss = 0
  let tie = 0
  game.games.forEach((current, index, array) => {
    const result = conditions.getGameWinner(current.cells)
    if (result === 0) {
      tie++
    } else if (store.user.email === current['player_x'].email) {
      switch (result) {
        case 'x': {
          win++
          break
        }
        case 'o': {
          loss++
          break
        }
      }
    } else if (store.user.email === current['player_o'].email) {
      switch (result) {
        case 'x': {
          loss++
          break
        }
        case 'o': {
          win++
          break
        }
      }
    }
  })
  $('#wins').text(win)
  $('#losses').text(loss)
  $('#ties').text(tie)
  $('#remaining').text(game.games.length - (win + loss + tie))
  $('#stats').removeClass('hidden')
}

const onStatsFailure = function (response, status, xhr) {
  console.log('Stats failure UI response', response)
  console.log('Stats failure UI status', status)
  console.log('Stats failure UI xhr', xhr)
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
  onGetFailure,
  onStatsFailure,
  onStatsSuccess
}
