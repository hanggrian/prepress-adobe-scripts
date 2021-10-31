require('../.stdlib/geometry.js')
var assert = require('./assert.js')

var equalTo = function() {
    assert.assertTrue([0, 1, 2, 3].equalTo([0, 1, 2, 3]))
}()

var getLeft = function() {
    assert.assertEquals(1, [1, 0, 0, 0].getLeft())
}()

var getTop = function() {
    assert.assertEquals(1, [0, 1, 0, 0].getTop())
}()

var getRight = function() {
    assert.assertEquals(1, [0, 0, 1, 0].getRight())
}()

var getBottom = function() {
    assert.assertEquals(1, [0, 0, 0, 1].getBottom())
}()

var getWidth = function() {
    assert.assertEquals(5, [5, 5, 10, 5].getWidth())
}()

var getHeight = function() {
    assert.assertEquals(5, [5, 10, 5, 5].getHeight())
}()