initTest($.fileName)

test('copyProperties', function() {
  var car = {
    wheel: 4,
    honk: true
  }
  var clone = Objects.copyProperties(car)
  assertEquals(4, clone.wheel)
  assertTrue(clone.honk)
})

test('pasteProperties', function() {
  var car = {
    wheel: 4,
    honk: true
  }
  var clone = Objects.copyProperties(car)
  var anotherCar = {}
  Objects.pasteProperties(clone, anotherCar)
  assertEquals(4, anotherCar.wheel)
  assertTrue(anotherCar.honk)
})
