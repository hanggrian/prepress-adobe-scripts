#target Illustrator
#include 'testing.js'

var isMacOs; (isMacOs = function() {
    assertTrue(isMacOS())
})()

var isNumeric; (isNumeric = function() {
    assertTrue(isNumeric(123))
    assertTrue(isNumeric(123.02))
    assertFalse(isNumeric('Hello World'))
})()