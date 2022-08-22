initTest($)

test("formatUnits", function() {
  assertTrue("2.5 mm", formatUnits("2.5", "mm", 1))
  assertTrue("2.55 mm", formatUnits("2.55", "mm", 2))
})

test("parseUnits", function() {
  assertEquals("7", parseUnits("2.5 mm").round())
})

test("parseRulerUnits", function() {
  assertEquals(RulerUnits.Pixels, parseRulerUnits("Pixels"))
  assertEquals(RulerUnits.Points, parseRulerUnits("Points"))
  assertEquals(RulerUnits.Inches, parseRulerUnits("Inches"))
  assertEquals(RulerUnits.Millimeters, parseRulerUnits("Millimeters"))
  assertEquals(RulerUnits.Centimeters, parseRulerUnits("Centimeters"))
})
