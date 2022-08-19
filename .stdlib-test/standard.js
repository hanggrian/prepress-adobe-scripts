#include "../.stdlib/stdlib.js"
#include "assert.js"

var run = function() {
  var count = 0
  assertEquals(undefined, "Hello".run(function() { count++ }))
  assertEquals(1, count)
}()

var also = function() {
  var count = 0
  assertEquals("Hello", "Hello".also(function() { count++ }))
  assertEquals(1, count)
}()

var let = function() {
  assertEquals("Hello World", "Hello".let(function(it) { return it + " World" }))
}()

var takeIf = function() {
  assertEquals("Hello", "Hello".takeIf(function(it) { return it.length === 5 }))
}()

var takeUnless = function() {
  assertEquals(undefined, "Hello".takeUnless(function(it) { return it.length === 5 }))
}()

var repeat = function() {
  var count = 0
  repeat(3, function() { count++ })
  assertEquals(3, count)
}()
