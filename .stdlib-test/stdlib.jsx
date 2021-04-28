#target Illustrator
#include 'testing.js'

var isMacOs; (isMacOs = function() {
    assertTrue(isMacOS())
})()

var isNumeric; (isNumeric = function() {
    assertTrue('123'.isNumeric())
    assertTrue('123.02'.isNumeric())
    assertFalse('Hello World'.isNumeric())
})()