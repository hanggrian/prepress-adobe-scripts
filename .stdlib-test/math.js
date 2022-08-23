initTest($)

test("isOdd", function() {
  assertTrue(1.0.isOdd())
  assertFalse(2.0.isOdd())
})

test("isEven", function() {
  assertFalse(1.0.isEven())
  assertTrue(2.0.isEven())
})

test("floor", function() {
  assertEquals(1, 1.5.floor())
})

test("ceil", function() {
  assertEquals(2, 1.5.ceil())
})

test("round", function() {
  assertEquals(1, 1.4.round())
  assertEquals(2, 1.6.round())
})

test("isEqualRounded", function() {
  assertTrue(isEqualRounded(1.1, 1))
  assertFalse(isEqualRounded(1.6, 1))
})

test("maxOf", function() {
  assertEquals(3, maxOf(1, 2, 3))
})
