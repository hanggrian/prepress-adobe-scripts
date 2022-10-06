/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Throws an error if the input is false.
 * Error message is always suffixed with period by SUI.
 * @param {boolean} value
 * @param {string|!Object=} errorMessage
 */
function check(value, errorMessage) {
  if (!value) {
    error(errorMessage || 'Failed requirement')
  }
}

/**
 * Throws an error if the input is null or undefined, otherwise return itself.
 * @param {*} value
 * @param {string|!Object=} errorMessage
 * @return {*}
 */
function checkNotNull(value, errorMessage) {
  if (value == null) {
    error(errorMessage || 'Expected value to be not null')
  }
  return value
}

/**
 * Throws an exception.
 * In dialog on click listener, throwing an error stops a script but does not show an alert.
 * In such cases, set `showAlert` to true.
 * Error message is always suffixed with period by SUI.
 * @param {string|!Object} message
 * @param {?string|?Object=} title
 */
function error(message, title) {
  var error = new Error(message)
  if (title !== undefined) {
    error.name = title
  }
  throw error
}
