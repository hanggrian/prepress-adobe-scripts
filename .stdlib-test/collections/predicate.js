initTest($.fileName)

test('first', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertEquals('Apple', Collections.first(fruits))
  assertEquals('Orange', Collections.first(fruits, function(it) {
    return it[0] === 'O'
  }))
})

test('last', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertEquals('Banana', Collections.last(fruits))
  assertEquals('Orange', Collections.last(fruits, function(it) {
    return it[0] === 'O'
  }))
})

test('none', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertTrue(Collections.none(fruits, function(it) {
    return it === 'Lemon'
  }))
})

test('any', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertTrue(Collections.any(fruits, function(it) {
    return it[0] === 'O'
  }))
})

test('all', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertFalse(Collections.all(fruits, function(it) {
    return it.length === 6
  }))
})

test('filter', function() {
  var fruits = ['Apple', 'Orange', 'Banana']
  assertEquals(2, Collections.filter(fruits, function(it) {
    return it.length === 6
  }).length)
})
