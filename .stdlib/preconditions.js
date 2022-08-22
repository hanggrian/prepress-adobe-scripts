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
 * Throws an error.
 * Error message is always suffixed with period by SUI.
 * @param {Object} message error description, may be null.
 * @param {Object} title error title, may be null.
 */
function error(message, title) {
  var error = new Error()
  if (message !== undefined) error.message = message.toString()
  if (title !== undefined) error.name = title.toString()
  throw error
}

/**
 * In dialog on click listener, throwing an error stops a script but does not show an alert.
 * This function shows an alert with error icon before the script stops.
 * Error message is always suffixed with period by SUI, following `error` and `check` convention.
 * @param {Object} message error description, may be null.
 * @param {Object} title error title, may be null.
 */
function errorWithAlert(message, title) {
  var error = new Error()
  if (message !== undefined) error.message = message.toString()
  if (title !== undefined) error.name = title.toString()
  alert(error.message + '.', error.name || "Uncaught JavaScript Exception", true)
  throw error
}
