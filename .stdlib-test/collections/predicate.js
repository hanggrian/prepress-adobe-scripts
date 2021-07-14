require('../../.stdlib/collections/base.js')
require('../../.stdlib/collections/predicate.js')
var assert = require('../assert.js')

var first = function() {
    var a = [1, 2, 3]
    assert.assertEquals(1, a.first())
    assert.assertEquals(2, a.first(function(it) { return it > 1 }))
}()

var last = function() {
    var a = [1, 2, 3]
    assert.assertEquals(3, a.last())
    assert.assertEquals(3, a.last(function(it) { return it > 1 }))
}()

var none = function() {
    var a = [1, 2, 3]
    assert.assertFalse(a.none())
    assert.assertTrue(a.none(function(it) { return it > 3 }))
}()

var any = function() {
    var a = [1, 2, 3]
    assert.assertTrue(a.any())
    assert.assertFalse(a.any(function(it) { return it > 3 }))
}()

var all = function() {
    var a = [1, 2, 3]
    assert.assertTrue(a.all(function(it) { return it <= 3 }))
}()

var filter = function() {
    var a = [1, 2, 3]
    assert.assertEquals(1, a.filter(function(it) { return it > 2 }).length)
}()