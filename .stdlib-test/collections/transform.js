initTest($)

test("map", function() {
  var a = [1, 2, 3]
  var result = Collections.map(a, function(it) { return it.toString() })
  assertEquals("1", result[0])
  assertEquals("3", result[2])
})

test("flatMap", function() {
  var a = [[1, 2], [3, 4], [5]]
  var result = Collections.flatMap(a, function(it) { return it.toString() })
  assertEquals("1", result[0])
  assertEquals("5", result[4])
})
