initTest($)

test("run", function() {
  var count = 0
  assertEquals(undefined, "Hello".run(function() { count++ }))
  assertEquals(1, count)
})

test("also", function() {
  var count = 0
  assertEquals("Hello", "Hello".also(function() { count++ }))
  assertEquals(1, count)
})

test("let", function() {
  assertEquals("Hello World", "Hello".let(function(it) { return it + " World" }))
})

test("takeIf", function() {
  assertEquals("Hello", "Hello".takeIf(function(it) { return it.length === 5 }))
})

test("takeUnless", function() {
  assertEquals(undefined, "Hello".takeUnless(function(it) { return it.length === 5 }))
})

test("repeat", function() {
  var count = 0
  repeat(3, function() { count++ })
  assertEquals(3, count)
})
