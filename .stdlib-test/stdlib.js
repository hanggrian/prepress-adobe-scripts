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

function initTest(script) {
  _scriptName = script.fileName.substringAfterLast("/").substringBefore(".")
}

function test(name, action) {
  _testName = name
  action()
}

function assertEquals(expected, actual) {
  if (expected != actual) {
    testError("`" + actual + "` to be `" + expected + "`")
  }
}

function assertNotEquals(expected, actual) {
  if (expected == actual) {
    testError("`" + actual + "` to not be `" + expected + "`")
  }
}

function assertTrue(expected) {
  if (!expected) {
    testError("to be true")
  }
}

function assertFalse(expected) {
  if (expected) {
    testError("to be false")
  }
}

/**
 * Assert that an object is undefined or null.
 * @param {Object} actual null object.
 */
function assertNull(actual) {
  if (actual !== undefined && actual !== null) {
    testError("to be null")
  }
}

/**
 * Assert that an object is not undefined or null.
 * @param {Object} actual non-null object.
 */
function assertNotNull(actual) {
  if (actual === undefined || actual === null) {
    testError("to be not null")
  }
}

/**
 * Throws an error in test.
 * Error message is always suffixed with period by SUI.
 * @param {Object} message error description, may be null.
 */
function testError(message) {
  var error = new Error()
  if (message !== undefined) {
    error.message = "`%s` at `%s`.\nExpected %s".format(_testName, _scriptName, message.toString())
  }
  error.name = "Test failed"
  throw error
}
