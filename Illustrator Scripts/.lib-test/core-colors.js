initTest($)

test('isColorEqual', function() {
  var colorA = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorB = new CMYKColor().also(function(it) { it.cyan = 100 })
  var colorC = new CMYKColor().also(function(it) { it.magenta = 100 })
  assertTrue(isColorEqual(colorA, colorB))
  assertFalse(isColorEqual(colorA, colorC))
})
