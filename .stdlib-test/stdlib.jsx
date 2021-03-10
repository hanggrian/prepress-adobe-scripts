#target Illustrator
#include 'testing.js'

assertTrue(isMacOS())

assertTrue(isNumeric(123))
assertTrue(isNumeric(123.02))
assertFalse(isNumeric('Hello World'))