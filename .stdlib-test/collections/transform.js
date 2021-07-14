require('../../.stdlib/collections/base.js')
require('../../.stdlib/collections/transform.js')
var assert = require('../assert.js')

var map = function() {
    var a = [1, 2, 3]
    var result = a.map(function(it) { return it.toString() })
    assert.assertEquals('1', result[0])
    assert.assertEquals('3', result[2])
}()

/* var flatMap = function() {
    var a = [[1, 2], [3, 4], [5]]
    var result = a.flatMap(function(it) { return it.toString() })
    assert.assertEquals('1', result[0])
    assert.assertEquals('5', result[4])
}() */