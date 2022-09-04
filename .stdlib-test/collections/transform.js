initTest($)

test("map", function() {
  var fruits = ["Apple", "Orange", "Banana"]
  var result = Collections.map(fruits, function(it) { return it.length })
  assertEquals(5, result[0])
  assertEquals(6, result[1])
  assertEquals(6, result[2])
})

test("flatMap", function() {
  var fruits = [["Apple", "Orange", "Banana"], ["Lemon", "Strawberry"]]
  var result = Collections.flatMap(fruits, function(it) { return it.length })
  assertEquals(5, result[0])
  assertEquals(6, result[1])
  assertEquals(6, result[2])
  assertEquals(5, result[3])
  assertEquals(10, result[4])
})
