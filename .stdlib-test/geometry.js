#include "../.stdlib/stdlib.js"
#include "assert.js"

var equalTo = function() {
  var boundsA = [1, 2, 3, 4]
  var boundsB = [1, 2, 3, 4]
  var boundsC = [4, 3, 2, 1]
  assertTrue(boundsA.equalTo(boundsB))
  assertFalse(boundsA.equalTo(boundsC))
}()

var isWithin = function() {
  var boundsInner = [0, 0, 0, 0]
  var boundsOuter = [-1, 1, 1, -1]
  assertTrue(boundsInner.isWithin(boundsOuter))
  assertFalse(boundsOuter.isWithin(boundsInner))
}()

var getLeft = function() {
  var bounds = [1, 0, 0, 0]
  assertEquals(1, bounds.getLeft())
}()

var getTop = function() {
  var bounds = [0, 1, 0, 0]
  assertEquals(1, bounds.getTop())
}()

var getRight = function() {
  var bounds = [0, 0, 1, 0]
  assertEquals(1, bounds.getRight())
}()

var getBottom = function() {
  var bounds = [0, 0, 0, 1]
  assertEquals(1, bounds.getBottom())
}()

var getWidth = function() {
  var bounds = [5, 5, 10, 5]
  assertEquals(5, bounds.getWidth())
}()

var getHeight = function() {
  var bounds = [5, 10, 5, 5]
  assertEquals(5, bounds.getHeight())
}()
