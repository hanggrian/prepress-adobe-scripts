#include "../.stdlib/stdlib.js"
#include "assert.js"

var isOdd = function() {
  assertTrue(1.0.isOdd())
  assertFalse(2.0.isOdd())
}()

var isEven = function() {
  assertFalse(1.0.isEven())
  assertTrue(2.0.isEven())
}()

var floor = function() {
  assertEquals(1, 1.5.floor())
}()

var ceil = function() {
  assertEquals(2, 1.5.ceil())
}()

var round = function() {
  assertEquals(1, 1.4.round())
  assertEquals(2, 1.6.round())
}()

var isEqualRounded = function() {
  assertTrue(isEqualRounded(1.1, 1))
  assertFalse(isEqualRounded(1.6, 1))
}()
