require('../.stdlib/collections-predicate.js')
require('../.stdlib/collections.js')
var assert = require('./assert.js')

var first; (first = function() {
    var a = [1, 2, 3]
    assert.assertEquals(1, a.first())
    assert.assertEquals(2, a.first(function(it) { return it > 1 }))
})()

var last; (last = function() {
    var a = [1, 2, 3]
    assert.assertEquals(3, a.last())
    assert.assertEquals(3, a.last(function(it) { return it > 1 }))
})()

var none; (none = function() {
    var a = [1, 2, 3]
    assert.assertFalse(a.none())
    assert.assertTrue(a.none(function(it) { return it > 3 }))
})()

var any; (any = function() {
    var a = [1, 2, 3]
    assert.assertTrue(a.any())
    assert.assertFalse(a.any(function(it) { return it > 3 }))
})()

var all; (all = function() {
    var a = [1, 2, 3]
    assert.assertTrue(a.all(function(it) { return it <= 3 }))
})()

var filter; (filter = function() {
    var a = [1, 2, 3]
    assert.assertEquals(1, a.filter(function(it) { return it > 2 }).length)
})()