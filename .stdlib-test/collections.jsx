#target Illustrator
#include 'testing.js'

var indexOf; (indexOf = function() {
    var a = [1, 2, 3]
    assertEquals(1, a.indexOf(2))
})()

var lastIndex; (lastIndex = function() {
    var a = [1, 2, 3]
    assertEquals(2, a.lastIndex())
})()

var first; (first = function() {
    var a = [1, 2, 3]
    assertEquals(1, a.first())
    assertEquals(2, a.first(function(it) { return it > 1 }))
})()

var last; (last = function() {
    var a = [1, 2, 3]
    assertEquals(3, a.last())
    assertEquals(3, a.last(function(it) { return it > 1 }))
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

var forEach; (forEach = function() {
    var a = [1, 2, 3]
    var result = []
    a.forEach(function(it) { result.push(it) })
    assertEquals(1, result.first())
    assertEquals(3, result.last())
})()

var forEachReversed; (forEachReversed = function() {
    var a = [1, 2, 3]
    var result = []
    a.forEachReversed(function(it) { result.push(it) })
    assertEquals(3, result.first())
    assertEquals(1, result.last())
})()

var map; (map = function() {
    var a = [1, 2, 3]
    var result = a.map(function(it) { return it.toString() })
    assertEquals('1', result.first())
    assertEquals('3', result.last())
})()

var flatMap; (flatMap = function() {
    var a = [[1, 2], [3, 4], [5]]
    var result = a.flatMap(function(it) { return it.toString() })
    assertEquals('1', result.first())
    assertEquals('5', result.last())
})()

var filter; (filter = function() {
    var a = [1, 2, 3]
    var result = a.filter(function(it) { return it > 1 })
    assertEquals(2, result.first())
    assertEquals(3, result.last())
})()