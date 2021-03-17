#target Illustrator
#include '../../.stdlib-test/testing.js'
#include '../.lib/core.js'

var cmyk; (cmyk = function() {
    assertEquals(100, COLOR_CYAN.cyan)
    assertEquals(100, COLOR_MAGENTA.magenta)
    assertEquals(100, COLOR_YELLOW.yellow)
    assertEquals(100, COLOR_BLACK.black)
})()

var isColorEqual; (isColorEqual = function() {
    assertTrue(isColorEqual(parseColor('Cyan'), COLOR_CYAN))
    assertTrue(isColorEqual(parseColor('Magenta'), COLOR_MAGENTA))
    assertTrue(isColorEqual(parseColor('Yellow'), COLOR_YELLOW))
    assertTrue(isColorEqual(parseColor('Black'), COLOR_BLACK))
})()