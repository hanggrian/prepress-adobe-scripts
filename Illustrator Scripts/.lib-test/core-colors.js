initTest($.fileName)

test('isColorEqual', function() {
  var colorA = new CMYKColor().apply(function(it) {
    it.cyan = 100
  })
  var colorB = new CMYKColor().apply(function(it) {
    it.cyan = 100
  })
  var colorC = new CMYKColor().apply(function(it) {
    it.magenta = 100
  })
  assertTrue(isColorEqual(colorA, colorB))
  assertFalse(isColorEqual(colorA, colorC))
})
