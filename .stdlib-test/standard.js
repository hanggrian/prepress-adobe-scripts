initTest($.fileName)

test('apply', function() {
  var count = 0
  assertEquals('Hello', 'Hello'.apply(function() { count++ }))
  assertEquals(1, count)
})

test('let', function() {
  assertEquals('Hello World', 'Hello'.run(function(it) { return it + ' World' }))
})

test('repeat', function() {
  var count = 0
  repeat(3, function() { count++ })
  assertEquals(3, count)
})
