//@include '../.stdlib/stdlib.js';

var _scriptName;
var _testName;

/**
 * Marks the js file as test subject.
 * @param {string} fileName use `$.fileName`.
 */
function initTest(fileName) {
  _scriptName = fileName.substringAfterLast('/').substringBefore('.');
}

/**
 * Test a topic within the subject.
 * @param {string} name topic name.
 * @param {function()} action where assertions are done.
 */
function test(name, action) {
  _testName = name;
  action();
}

/**
 * Asserts that both values are equal.
 * @param {?Object} expected first value.
 * @param {?Object} actual second value.
 */
function assertEquals(expected, actual) {
  if (expected != actual) {
    testError('`' + actual + '` to be `' + expected + '`');
  }
}

/**
 * Asserts that both values are not equal.
 * @param {?Object} expected first value.
 * @param {?Object} actual second value.
 */
function assertNotEquals(expected, actual) {
  if (expected == actual) {
    testError('`' + actual + '` to not be `' + expected + '`');
  }
}

/**
 * Asserts that an expression is true.
 * @param {boolean} actual input value.
 */
function assertTrue(actual) {
  if (!actual) {
    testError('to be true');
  }
}

/**
 * Asserts that an expression is false.
 * @param {boolean} actual input value.
 */
function assertFalse(actual) {
  if (actual) {
    testError('to be false');
  }
}

/**
 * Assert that the value is undefined or null.
 * @param {?Object} actual input value.
 */
function assertNull(actual) {
  if (actual !== undefined && actual !== null) {
    testError('to be null');
  }
}

/**
 * Assert that the value is not undefined or null.
 * @param {?Object} actual input value.
 */
function assertNotNull(actual) {
  if (actual === undefined || actual === null) {
    testError('to be not null');
  }
}

/**
 * Throws an error in test. Error message is always suffixed with period by SUI.
 * @param {string|!Object} message error description.
 */
function testError(message) {
  var error = new Error();
  error.message = '`%s` at `%s`.\nExpected %s'.format(_testName, _scriptName, message);
  error.name = 'Test failed';
  throw error;
}
