/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Throws an error if the input is false.
 * Error message is always suffixed with period by SUI.
 * @param {Boolean} value input value.
 * @param {String|Object} errorMessage helpful alert, may be null.
 */
function check(value, errorMessage) {
  if (!value) {
    error(getOrDefault(errorMessage, "Failed requirement"))
  }
}

/**
 * Throws an error if the input is null or undefined, otherwise return itself.
 * @param {*} value input value.
 * @param {String|Object} errorMessage helpful alert, may be null.
 * @return {*}
 */
function checkNotNull(value, errorMessage) {
  if (value == null) {
    error(getOrDefault(errorMessage, "Expected value to be not null"))
  }
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
