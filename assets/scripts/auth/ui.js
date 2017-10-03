'use strict'
const store = require('../store.js')
const game = require('../game.js')

// Sign Up promises
const signUpSuccess = function (response, status, xhr) {
  // console.log('Sign Up success UI response', response)
  // console.log('Sign Up success UI status', status)
  // console.log('Sign Up success UI xhr', xhr)
  $('#signin-modal').modal('hide')
  $('#signin input[name="credentials[email]"]').val($('#signup input[name="credentials[email]"]').val())
  $('#signin input[name="credentials[password]"]').val($('#signup input[name="credentials[password]"]').val())
  $('#signin').trigger('submit')
  clearModals()
}

const signUpFailure = function (response, status, xhr) {
  // console.log('Sign Up failure UI response', response)
  // console.log('Sign Up failure UI status', status)
  // console.log('Sign Up failure UI xhr', xhr)
  $('#signUpComment').html('<br/><p><mark>Sorry, those login credentials cannot be used.</mark></p>')
}

// Sign In promises
const signInSuccess = function (response, status, xhr) {
  // console.log('Sign In success UI response', response)
  // console.log('Sign In success UI status', status)
  // console.log('Sign In success UI xhr', xhr)
  $('#login-modal').modal('hide')
  store.user = response.user
  toggleUserDisplay(true)
  $('#wins').trigger('keydown')
  clearModals()
}
const signInFailure = function (response, status, xhr) {
  // console.log('Sign In failure UI response', response)
  // console.log('Sign In failure UI status', status)
  // console.log('Sign In failure UI xhr', xhr)
  $('#signInComment').html('<br/><p><mark>Please check login credentials and try again.</mark></p>')
}

// Change Password promises
const changePasswordSuccess = function (response, status, xhr) {
  // console.log('Change Password success UI response', response)
  // console.log('Change Password success UI status', status)
  // console.log('Change Password success UI xhr', xhr)
  $('#changeComment').append('<p>Password change successful.</p>')
  clearModals()
}

const changePasswordFailure = function (response, status, xhr) {
  // console.log('Change Password failure UI response', response)
  // console.log('Change Password failure UI status', status)
  // console.log('Change Password failure UI xhr', xhr)
  $('#changeComment').append('<p><mark>Could not update password.</mark></p>')
}

const signOutSuccess = function (response, status, xhr) {
  // console.log('Sign Out success UI response', response)
  // console.log('Sign Out success UI status', status)
  // console.log('Sign Out success UI xhr', xhr)
  store.user = null
  game.game = null
  toggleUserDisplay(false)
}

const signOutFailure = function (response, status, xhr) {
  // console.log('Sign Out failure UI response', response)
  // console.log('Sign Out failure UI status', status)
  // console.log('Sign Out failure UI xhr', xhr)
}

const clearModals = function () {
  $('input[name="credentials[email]"]').val('')
  $('input[name="credentials[password]"]').val('')
  $('input[name="passwords[old]"]').val('')
  $('input[name="passwords[new]"]').val('')
  $('input[name="credentials[password_confirmation]"]').val('')
  $('#signInComment').text('')
  $('#changeComment').text('')
  $('#signUpComment').text('')
}

const toggleUserDisplay = function (check) {
  if (check) {
    $('[data-user="no-user"]').addClass('hidden')
    $('[data-user="user"]').removeClass('hidden')
    $('#current-user').text(store.user.email).append('<span class="caret"></span>')
  } else {
    $('[data-user="no-user"]').removeClass('hidden')
    $('#playarea').addClass('hidden')
    $('[data-user="user"]').addClass('hidden')
  }
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signUpFailure,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
