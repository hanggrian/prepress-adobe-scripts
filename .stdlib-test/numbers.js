require('../.stdlib/numbers.js')
var assert = require('./assert.js')

var round = function() {
    assert.assertEquals(1, 1.1.round())
    assert.assertEquals(2, 1.9.round())
}()

var floor = function() {
    assert.assertEquals(1, 1.1.floor())
    assert.assertEquals(1, 1.9.floor())
}()

var isOdd = function() {
    assert.assertTrue(1.0.isOdd())
    assert.assertFalse(2.0.isOdd())
}()

var isEven = function() {
    assert.assertFalse(1.0.isEven())
    assert.assertTrue(2.0.isEven())
}()