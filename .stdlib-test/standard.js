require('../.stdlib/standard.js')
var assert = require('./assert.js')

var run = function() {
    var count = 0
    assert.assertEquals(undefined, 'Hello'.run(function() { count++ }))
    assert.assertEquals(1, count)
}()

var also = function() {
    var count = 0
    assert.assertEquals('Hello', 'Hello'.also(function() { count++ }))
    assert.assertEquals(1, count)
}()

var let = function() {
    assert.assertEquals('Hello World', 'Hello'.let(function(it) { return it + ' World' }))
}()

var takeIf = function() {
    assert.assertEquals('Hello', 'Hello'.takeIf(function(it) { return it.length === 5 }))
}()

var takeUnless = function() {
    assert.assertEquals(undefined, 'Hello'.takeUnless(function(it) { return it.length === 5 }))
}()