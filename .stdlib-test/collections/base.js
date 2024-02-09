initTest($.fileName)

test('indexOf', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertEquals(1, Collections.indexOf(fruits, 'Orange'))
})

test('lastIndex', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertEquals(2, Collections.lastIndex(fruits))
})

test('isEmpty', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertTrue(Collections.isEmpty([]))
  assertFalse(Collections.isEmpty(fruits))
})

test('isNotEmpty', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertFalse(Collections.isNotEmpty([]))
  assertTrue(Collections.isNotEmpty(fruits))
})

test('contains', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertTrue(Collections.contains(fruits, 'Orange'))
  assertFalse(Collections.contains(fruits, 'Lemon'))
})

test('forEach', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  var result = []
  Collections.forEach(fruits, function(it) {
    result.push(it)
  })
  assertEquals('Apple', result[0])
  assertEquals('Orange', result[1])
  assertEquals('Banana', result[2])
})

test('distinct', function() {
  var fruits = Collections.distinct(['Apple', 'Orange', 'Orange', 'Banana', 'Banana', 'Banana'])
  assertEquals('Apple', fruits[0])
  assertEquals('Orange', fruits[1])
  assertEquals('Banana', fruits[2])
})

test('copyOf', function() {
  var fruits = Collections.copyOf(['Apple', 'Orange', 'Banana'])
  assertEquals('Apple', fruits[0])
  assertEquals('Orange', fruits[1])
  assertEquals('Banana', fruits[2])
})

test('reversed', function() {
  var fruits = Collections.reversed(['Apple', 'Orange', 'Banana'])
  assertEquals('Banana', fruits[0])
  assertEquals('Orange', fruits[1])
  assertEquals('Apple', fruits[2])
})
