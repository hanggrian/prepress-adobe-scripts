initTest($.fileName)

test('equals', function() {
  var boundsA = [1, 2, 3, 4]
  var boundsB = [1, 2, 3, 4]
  var boundsC = [4, 3, 2, 1]
  assertTrue(boundsA.equals(boundsB))
  assertFalse(boundsA.equals(boundsC))
})

test('contains', function() {
  var boundsInner = [0, 0, 0, 0]
  var boundsOuter = [-1, 1, 1, -1]
  assertTrue(boundsOuter.contains(boundsInner))
  assertFalse(boundsInner.contains(boundsOuter))
})

test('getLeft', function() {
  var bounds = [1, 0, 0, 0]
  assertEquals(1, bounds.getLeft())
})

test('getTop', function() {
  var bounds = [0, 1, 0, 0]
  assertEquals(1, bounds.getTop())
})

test('getRight', function() {
  var bounds = [0, 0, 1, 0]
  assertEquals(1, bounds.getRight())
})

test('getBottom', function() {
  var bounds = [0, 0, 0, 1]
  assertEquals(1, bounds.getBottom())
})

test('getWidth', function() {
  var bounds = [5, 5, 10, 5]
  assertEquals(5, bounds.getWidth())
})

test('getHeight', function() {
  var bounds = [5, 10, 5, 5]
  assertEquals(5, bounds.getHeight())
})
