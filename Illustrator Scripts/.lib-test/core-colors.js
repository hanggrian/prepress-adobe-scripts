#include "../.lib/core.js"
#include "../../.stdlib-test/assert.js"

var parseColor = function() {
  var cyan = parseColor("Cyan")
  assertTrue(100, cyan.cyan)
  var magenta = parseColor("Magenta")
  assertTrue(100, magenta.magenta)
  var yellow = parseColor("Yellow")
  assertTrue(100, yellow.yellow)
  var black = parseColor("Black")
  assertTrue(100, black.black)
}()

var isColorEqual = function() {
  var colorA = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorB = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorC = new CMYKColor().also(function(it) { it.magenta = 100 })
  assertTrue(isColorEqual(colorA, colorB))
  assertFalse(isColorEqual(colorA, colorC))
}()
