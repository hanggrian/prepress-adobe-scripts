initTest($)

test("parseDate", function() {
  var nativeDate = new Date(2021, 06, 30)
  var parsedDate = parseDate("2021-07-30T00:00:00Z")
  assertEquals(nativeDate.getFullYear(), parsedDate.getFullYear())
  assertEquals(nativeDate.getMonth(), parsedDate.getMonth())
  assertEquals(nativeDate.getDate(), parsedDate.getDate())
})

test("toISOString", function() {
  var nativeDate = new Date(2021, 6, 30)
  assertEquals("2021-07-30", nativeDate.toISOString())
})
