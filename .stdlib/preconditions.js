/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Asserts that a condition is satisfied, throw an error otherwise.
 * Error message is always suffixed with period by SUI.
 * @param {Boolean} requirement expect value to be `true`.
 * @param {Object} errorMessage helpful alert, may be null.
 */
function check(requirement, errorMessage) {
  if (!requirement) {
    error(errorMessage || "Failed requirement")
  }
}

/**
 * Asserts that a value is null.
 * @param {Object} value expected to be `undefined` or `null`.
 * @returns {Object}
 */
function checkNull(value) {
  check(value === undefined || value === null, "Expected value to be null")
  return value
}

/**
 * Asserts that a value is not null.
 * @param {Object} value expected to be not `undefined` and not `null`.
 * @returns {Object}
 */
function checkNotNull(value) {
  check(value !== undefined && value !== null, "Expected value to be not null")
  return value
}

/**
 * Throws an exception.
 * In dialog on click listener, throwing an error stops a script but does not show an alert.
 * In such cases, set `showAlert` to true.
 * Error message is always suffixed with period by SUI.
 * @param {String|Object} message error description.
 * @param {String|Object} title error title, may be null.
 */
function error(message, title) {
  var error = new Error(message)
  if (title !== undefined) {
    error.name = title
  }
  throw error
}
