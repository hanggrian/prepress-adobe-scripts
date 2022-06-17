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
