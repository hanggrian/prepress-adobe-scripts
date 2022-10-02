#include "../.stdlib/stdlib.js"

#include "collections/base.js"
#include "collections/predicate.js"
#include "collections/transform.js"
#include "io/file.js"
#include "sui/child-button.js"
#include "sui/child-dropdownlist.js"
#include "sui/child-edittext.js"
#include "sui/child-iconbutton.js"
#include "sui/child-image.js"
#include "sui/child-listbox.js"
#include "sui/child-progressbar.js"
#include "sui/child-slider.js"
#include "sui/child-staticText.js"
#include "sui/child-toggles.js"
#include "sui/parent-group.js"
#include "sui/parent-panel.js"
#include "sui/parent-tab.js"
#include "geometry.js"
#include "math.js"
#include "standard.js"
#include "text.js"
#include "time.js"

var _scriptName, _testName

/**
 * Marks the js file as test subject.
 * @param {Object} script dollar-sign object.
 */
function initTest(script) {
  _scriptName = script.fileName.substringAfterLast("/").substringBefore(".")
}

/**
 * Test a topic within the subject.
 * @param {String} name topic name.
 * @param {Function} action where assertions are done.
 */
function test(name, action) {
  _testName = name
  action()
}

/**
 * Asserts that both values are equal.
 * @param {*} expected first value.
 * @param {*} actual second value.
 */
function assertEquals(expected, actual) {
  if (expected != actual) {
    testError("`" + actual + "` to be `" + expected + "`")
  }
}

/**
 * Asserts that both values are not equal.
 * @param {*} expected first value.
 * @param {*} actual second value.
 */
function assertNotEquals(expected, actual) {
  if (expected == actual) {
    testError("`" + actual + "` to not be `" + expected + "`")
  }
}

/**
 * Asserts that an expression is true.
 * @param {*} actual input value.
 */
function assertTrue(expected) {
  if (!expected) {
    testError("to be true")
  }
}

/**
 * Asserts that an expression is false.
 * @param {*} actual input value.
 */
function assertFalse(expected) {
  if (expected) {
    testError("to be false")
  }
}

/**
 * Assert that the value is undefined or null.
 * @param {*} actual input value.
 */
function assertNull(actual) {
  if (actual !== undefined && actual !== null) {
    testError("to be null")
  }
}

/**
 * Assert that the value is not undefined or null.
 * @param {*} actual input value.
 */
function assertNotNull(actual) {
  if (actual === undefined || actual === null) {
    testError("to be not null")
  }
}

/**
 * Throws an error in test.
 * Error message is always suffixed with period by SUI.
 * @param {String|Object} message error description.
 */
function testError(message) {
  var error = new Error()
  error.message = "`%s` at `%s`.\nExpected %s".format(_testName, _scriptName, message)
  error.name = "Test failed"
  throw error
}
