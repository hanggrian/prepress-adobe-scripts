#target Illustrator
#include 'testing.js'

var startsWith; (startsWith = function() {
    var s = 'Hello World'
    assertTrue(s.startsWith('Hello'))
    assertFalse(s.startsWith('World'))
})

var endsWith; (endsWith = function() {
    var s = 'Hello World'
    assertFalse(s.endsWith('Hello'))
    assertTrue(s.endsWith('World'))
})

var substringBefore; (endsWith = function() {
    var s = 'Hello World'
    assertEquals('Hell', s.substringBefore('o'))
})

var substringAfter; (substringAfter = function() {
    var s = 'Hello World'
    assertEquals(' World', s.substringAfter('o'))
})

var substringBeforeLast; (endsWith = function() {
    var s = 'Hello World'
    assertEquals('Hello W', s.substringBeforeLast('o'))
})

var substringAfterLast; (substringAfter = function() {
    var s = 'Hello World'
    assertEquals('rld', s.substringAfterLast('o'))
})