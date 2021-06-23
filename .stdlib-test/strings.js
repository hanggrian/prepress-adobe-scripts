require('../.stdlib/strings.js')
var assert = require('./assert.js')

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
}()

var substringAfter = function() {
    var s = 'Hello World'
    assert.assertEquals(' World', s.substringAfter('o'))
}()

var substringBeforeLast = function() {
    var s = 'Hello World'
    assert.assertEquals('Hello W', s.substringBeforeLast('o'))
}()

var substringAfterLast = function() {
    var s = 'Hello World'
    assert.assertEquals('rld', s.substringAfterLast('o'))
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