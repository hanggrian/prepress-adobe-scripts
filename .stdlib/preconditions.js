/**
 * Assert that a condition is satisfied, throw an error otherwise.
 * @param {Boolean} requirement expect value to be `true`.
 * @param {String} errorMessage helpful alert, may be null.
 * @return {void}
 */
function check(requirement, errorMessage) {
    if (!requirement) {
        var message = errorMessage !== undefined
            ? errorMessage
            : 'Failed requirement'
        throw new Error(message)
    }
}

/** 
 * Assert that a value is null.
 * @param {String} errorMessage helpful alert, may be null.
 * @return {Object}
 */
function checkNull(value, errorMessage) { 
    check(value === undefined || value === null, errorMessage !== undefined
        ? errorMessage
        : 'Expected value to be null')
    return value
}

/** 
 * Assert that a value is not null.
 * @param {String} errorMessage helpful alert, may be null.
 * @return {Object}
 */
function checkNotNull(value, errorMessage) {
    check(value !== undefined && value !== null, errorMessage !== undefined
        ? errorMessage
        : 'Expected value to be not null')
    return value
}

/** Assert an item's typename. */
function checkTypename(item, typename) {
    check(item.typename === typename, 'Selected item is not a ' + typename)
}