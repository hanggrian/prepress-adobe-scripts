require('../../.stdlib/collections/base.js')
var assert = require('../assert.js')

var indexOf = function() {
  var a = [1, 2, 3]
  assert.assertEquals(1, a.indexOf(2))
}()

var lastIndex = function() {
  var a = [1, 2, 3]
  assert.assertEquals(2, a.lastIndex())
}()

var isEmpty = function() {
  var a = [1, 2, 3]
  assert.assertTrue([].isEmpty())
  assert.assertFalse(a.isEmpty())
}()

var isNotEmpty = function() {
  var a = [1, 2, 3]
  assert.assertTrue([].isEmpty())
  assert.assertFalse(a.isEmpty())
}()

var contains = function() {
  var a = [1, 2, 3]
  assert.assertTrue(a.contains(2))
  assert.assertFalse(a.contains(4))
}()

var distinct = function() {
  var a = [1, 2, 2, 3, 3, 3].distinct()
  assert.assertEquals(1, a[0])
  assert.assertEquals(2, a[1])
  assert.assertEquals(3, a[2])
}()

var forEach = function() {
  var a = [1, 2, 3]
  var result = []
  a.forEach(function(it) { result.push(it) })
  assert.assertEquals(1, result[0])
  assert.assertEquals(3, result[2])
}()

var forEachReversed = function() {
  var a = [1, 2, 3]
  var result = []
  a.forEachReversed(function(it) { result.push(it) })
  assert.assertEquals(3, result[0])
  assert.assertEquals(1, result[2])
}()