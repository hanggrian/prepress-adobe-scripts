#target Illustrator
#include 'testing.js'

var includes; (includes = function() {
    var s = 'Hello World'
    assertTrue(s.includes('Hello'))
    assertFalse(s.includes('Helloo'))
})()

var startsWith; (startsWith = function() {
    var s = 'Hello World'
    assertTrue(s.startsWith('Hello'))
    assertFalse(s.startsWith('World'))
})()

var endsWith; (endsWith = function() {
    var s = 'Hello World'
    assertFalse(s.endsWith('Hello'))
    assertTrue(s.endsWith('World'))
})()

var substringBefore; (endsWith = function() {
    var s = 'Hello World'
    assertEquals('Hell', s.substringBefore('o'))
})()

var substringAfter; (substringAfter = function() {
    var s = 'Hello World'
    assertEquals(' World', s.substringAfter('o'))
})()

var substringBeforeLast; (endsWith = function() {
    var s = 'Hello World'
    assertEquals('Hello W', s.substringBeforeLast('o'))
})()

var substringAfterLast; (substringAfter = function() {
    var s = 'Hello World'
    assertEquals('rld', s.substringAfterLast('o'))
})()

var isNumeric; (isNumeric = function() {
    assertTrue('123'.isNumeric())
    assertTrue('123.02'.isNumeric())
    assertFalse('Hello World'.isNumeric())
})()

var trimStart; (trimStart = function() {
    var s = '  Hello World  '
    assertEquals('Hello World  ', s.trimStart())
})()

var trimEnd; (trimEnd = function() {
    var s = '  Hello World  '
    assertEquals('  Hello World', s.trimEnd())
})()

var trim; (trim = function() {
    var s = '  Hello World  '
    assertEquals('Hello World', s.trim())
})()