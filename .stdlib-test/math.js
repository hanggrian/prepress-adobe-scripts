initTest($.fileName)

test('isOdd', function() {
  assertTrue(1.0.isOdd())
  assertFalse(2.0.isOdd())
})

test('isEven', function() {
  assertFalse(1.0.isEven())
  assertTrue(2.0.isEven())
})

test('isInt', function() {
  var num = 1
  assertTrue(num.isInt())

  assertFalse(-2.7.isInt())
  assertFalse(-0.5.isInt())
  assertFalse(0.3.isInt())
  assertFalse(1.5.isInt())
  assertFalse(2.8.isInt())
})
