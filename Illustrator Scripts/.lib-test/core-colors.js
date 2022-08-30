initTest($)

test("parseColor", function() {
  var cyan = parseColor(getString(R.string.cyan))
  assertTrue(100, cyan.cyan)
  var magenta = parseColor(getString(R.string.magenta))
  assertTrue(100, magenta.magenta)
  var yellow = parseColor(getString(R.string.yellow))
  assertTrue(100, yellow.yellow)
  var black = parseColor(getString(R.string.black))
  assertTrue(100, black.black)
})

test("isColorEqual", function() {
  var colorA = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorB = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorC = new CMYKColor().also(function(it) { it.magenta = 100 })
  assertTrue(isColorEqual(colorA, colorB))
  assertFalse(isColorEqual(colorA, colorC))
})
