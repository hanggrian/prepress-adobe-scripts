#include "../../.stdlib/stdlib.js"
#include "../assert.js"

var first = function() {
  var a = [1, 2, 3]
  assertEquals(1, Collections.first(a))
  assertEquals(2, Collections.first(a, function(it) { return it > 1 }))
}()

var last = function() {
  var a = [1, 2, 3]
  assertEquals(3, Collections.last(a))
  assertEquals(3, Collections.last(a, function(it) { return it > 1 }))
}()

var none = function() {
  var a = [1, 2, 3]
  assertTrue(Collections.none(a, function(it) { return it > 3 }))
}()

var any = function() {
  var a = [1, 2, 3]
  assertFalse(Collections.any(a, function(it) { return it > 3 }))
}()

var all = function() {
  var a = [1, 2, 3]
  assertTrue(Collections.all(a, function(it) { return it <= 3 }))
}()

var filter = function() {
  var a = [1, 2, 3]
  assertEquals(1, Collections.filter(a, function(it) { return it > 2 }).length)
}()
