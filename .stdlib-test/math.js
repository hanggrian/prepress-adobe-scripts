initTest($.fileName)

test('isOdd', function() {
  assertTrue(1.0.isOdd())
  assertFalse(2.0.isOdd())
})

test('isEven', function() {
  assertFalse(1.0.isEven())
  assertTrue(2.0.isEven())
})

test('isEqualRounded', function() {
  assertTrue(isEqualRounded(1.1, 1))
  assertFalse(isEqualRounded(1.6, 1))
})
