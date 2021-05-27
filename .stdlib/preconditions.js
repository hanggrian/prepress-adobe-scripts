/**
 * Assert that a condition is satisfied, throw an error otherwise.
 * @param {Boolean} requirement expect value to be `true`.
 * @param {String} errorMessage helpful alert, may be null.
 * @returns {void}
 */
function check(requirement, errorMessage) {
    if (!requirement) {
        error(errorMessage)
    }
}

/**
 * Assert that a value is null.
 * @param {String} errorMessage helpful alert, may be null.
 * @returns {Object}
 */
function checkNull(value, errorMessage) {
    check(value === undefined || value === null, errorMessage)
    return value
}

/**
 * Assert that a value is not null.
 * @param {String} errorMessage helpful alert, may be null.
 * @returns {Object}
 */
function checkNotNull(value, errorMessage) {
    check(value !== undefined && value !== null, errorMessage)
    return value
}

/** Assert an item's typename. */
function checkTypename(item, typename) {
    check(item.typename === typename, 'Selected item is not a ' + typename)
}

/**
 * Throw an error.
 * @param {Object} errorMessage helpful alert, may be null.
 */
function error(errorMessage) {
    var message = errorMessage !== undefined
        ? errorMessage.toString()
        : 'Failed requirement'
    throw new Error(message)
}

/**
 * In dialog on click listener, throwing an error stops a script but does not show an alert.
 * This function shows an alert with error icon before the script stops.
 * @param {Object} errorMessage helpful alert, may be null.
 */
function errorWithAlert(errorMessage) {
    alert(errorMessage, 'Uncaught JavaScript exception', true)
    error(errorMessage)
}