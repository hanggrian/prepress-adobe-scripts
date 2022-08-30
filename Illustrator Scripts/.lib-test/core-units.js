initTest($)

test("formatUnits", function() {
  assertTrue("2.5 mm", formatUnits("2.5", "mm", 1))
  assertTrue("2.55 mm", formatUnits("2.55", "mm", 2))
})

test("parseUnits", function() {
  assertEquals("7", parseUnits("2.5 mm").round())
})

test("parseRulerUnits", function() {
  assertEquals(RulerUnits.Pixels, parseRulerUnits(getString(R.string.pixels)))
  assertEquals(RulerUnits.Points, parseRulerUnits(getString(R.string.points)))
  assertEquals(RulerUnits.Inches, parseRulerUnits(getString(R.string.inches)))
  assertEquals(RulerUnits.Millimeters, parseRulerUnits(getString(R.string.millimeters)))
  assertEquals(RulerUnits.Centimeters, parseRulerUnits(getString(R.string.centimeters)))
})
