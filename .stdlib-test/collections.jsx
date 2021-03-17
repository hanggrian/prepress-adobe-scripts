#target Illustrator
#include 'testing.js'

var lastIndex; (lastIndex = function() {
    var a = [1, 2, 3]
    assertEquals(2, a.lastIndex())
})()

var first; (first = function() {
    var a = [1, 2, 3]
    assertEquals(1, a.first())
})()

var last; (last = function() {
    var a = [1, 2, 3]
    assertEquals(3, a.last())
})()

var isEmpty; (isEmpty = function() {
    var a = [1, 2, 3]
    assertTrue([].isEmpty())
    assertFalse(a.isEmpty())
})()

var isNotEmpty; (isEmpty = function() {
    var a = [1, 2, 3]
    assertTrue([].isEmpty())
    assertFalse(a.isEmpty())
})()

var contains; (contains = function() {
    var a = [1, 2, 3]
    assertTrue(a.contains(2))
    assertFalse(a.contains(4))
})()

var distinct; (distinct = function() {
    var a = [1, 2, 2, 3, 3, 3].distinct()
    assertEquals(1, a[0])
    assertEquals(2, a[1])
    assertEquals(3, a[2])
})()