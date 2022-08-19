#include "../.stdlib/stdlib.js"
#include "assert.js"

var isEmpty = function() {
  assertTrue("".isEmpty())
  assertFalse("Hello World".isEmpty())
}()

var isNotEmpty = function() {
  assertTrue("Hello World".isNotEmpty())
  assertFalse("".isNotEmpty())
}()

var isBlank = function() {
  assertTrue(" ".isBlank())
  assertFalse("Hello World".isBlank())
}()

var isNotBlank = function() {
  assertTrue("Hello World".isNotBlank())
  assertFalse(" ".isNotBlank())
}()

var includes = function() {
  var s = "Hello World"
  assertTrue(s.includes("Hello"))
  assertFalse(s.includes("Helloo"))
}()

var startsWith = function() {
  var s = "Hello World"
  assertTrue(s.startsWith("Hello"))
  assertFalse(s.startsWith("World"))
}()

var endsWith = function() {
  var s = "Hello World"
  assertFalse(s.endsWith("Hello"))
  assertTrue(s.endsWith("World"))
}()

var substringBefore = function() {
  var s = "Hello World"
  assertEquals("Hell", s.substringBefore("o"))
  assertEquals("Hello ", s.substringBefore("World"))
}()

var substringBeforeLast = function() {
  var s = "Hello World"
  assertEquals("Hello W", s.substringBeforeLast("o"))
  assertEquals("Hello ", s.substringBeforeLast("World"))
}()

var substringAfter = function() {
  var s = "Hello World"
  assertEquals(" World", s.substringAfter("o"))
  assertEquals("", s.substringAfter("World"))
}()

var substringAfterLast = function() {
  var s = "Hello World"
  assertEquals("rld", s.substringAfterLast("o"))
  assertEquals("", s.substringAfterLast("World"))
}()

var isNumeric = function() {
  assertTrue("123".isNumeric())
  assertTrue("123.02".isNumeric())
  assertFalse("Hello World".isNumeric())
}()

var trimStart = function() {
  var s = "  Hello World  "
  assertEquals("Hello World  ", s.trimStart())
}()

var trimEnd = function() {
  var s = "  Hello World  "
  assertEquals("  Hello World", s.trimEnd())
}()

var trim = function() {
  var s = "  Hello World  "
  assertEquals("Hello World", s.trim())
}()

var format = function() {
  var s = "Hi, my name is {0}, I'm a {1}."
  assertEquals("Hi, my name is Hendra, I'm a Potato.", s.format("Hendra", "Potato"))
}()

var formatArr = function() {
  var s = "Hi, my name is {0}, I'm a {1}."
  assertEquals("Hi, my name is Hendra, I'm a Potato.", s.formatArr(["Hendra", "Potato"]))
}()
