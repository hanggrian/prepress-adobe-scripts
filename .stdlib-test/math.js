require('../.stdlib/math.js')
var assert = require('./assert.js')

var isOdd = function() {
  assert.assertTrue(1.0.isOdd())
  assert.assertFalse(2.0.isOdd())
}()

var isEven = function() {
  assert.assertFalse(1.0.isEven())
  assert.assertTrue(2.0.isEven())
}()

var floor = function() {
  assert.assertEquals(1, 1.5.floor())
}()

var ceil = function() {
  assert.assertEquals(2, 1.5.ceil())
}()

var round = function() {
  assert.assertEquals(1, 1.4.round())
  assert.assertEquals(2, 1.6.round())
}()
