require('../.stdlib/text.js')
var assert = require('./assert.js')

var isEmpty = function() {
  assert.assertTrue(''.isEmpty())
  assert.assertFalse('Hello World'.isEmpty())
}()

var isNotEmpty = function() {
  assert.assertTrue('Hello World'.isNotEmpty())
  assert.assertFalse(''.isNotEmpty())
}()

var includes = function() {
  var s = 'Hello World'
  assert.assertTrue(s.includes('Hello'))
  assert.assertFalse(s.includes('Helloo'))
}()

var startsWith = function() {
  var s = 'Hello World'
  assert.assertTrue(s.startsWith('Hello'))
  assert.assertFalse(s.startsWith('World'))
}()

var endsWith = function() {
  var s = 'Hello World'
  assert.assertFalse(s.endsWith('Hello'))
  assert.assertTrue(s.endsWith('World'))
}()

var substringBefore = function() {
  var s = 'Hello World'
  assert.assertEquals('Hell', s.substringBefore('o'))
  assert.assertEquals('Hello ', s.substringBefore('World'))
}()

var substringAfter = function() {
  var s = 'Hello World'
  assert.assertEquals(' World', s.substringAfter('o'))
  assert.assertEquals('', s.substringAfter('World'))
}()

var substringBeforeLast = function() {
  var s = 'Hello World'
  assert.assertEquals('Hello W', s.substringBeforeLast('o'))
  assert.assertEquals('Hello ', s.substringBeforeLast('World'))
}()

var substringAfterLast = function() {
  var s = 'Hello World'
  assert.assertEquals('rld', s.substringAfterLast('o'))
  assert.assertEquals('', s.substringAfterLast('World'))
}()

var isNumeric = function() {
  assert.assertTrue('123'.isNumeric())
  assert.assertTrue('123.02'.isNumeric())
  assert.assertFalse('Hello World'.isNumeric())
}()

var trimStart = function() {
  var s = '  Hello World  '
  assert.assertEquals('Hello World  ', s.trimStart())
}()

var trimEnd = function() {
  var s = '  Hello World  '
  assert.assertEquals('  Hello World', s.trimEnd())
}()

var trim = function() {
  var s = '  Hello World  '
  assert.assertEquals('Hello World', s.trim())
}()

var format = function() {
  var s = "Hi, my name is {0}, I'm a {1}."
  assert.assertEquals("Hi, my name is Hendra, I'm a Potato.", s.format('Hendra', 'Potato'))
}()

var formatArr = function() {
  var s = "Hi, my name is {0}, I'm a {1}."
  assert.assertEquals("Hi, my name is Hendra, I'm a Potato.", s.formatArr(['Hendra', 'Potato']))
}()
