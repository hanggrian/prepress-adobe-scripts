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

/** Assert that a value is null. */
function checkNull(value) { check(value === null || value === undefined, 'Expected value to be null') }

/** Assert that a value is not null. */
function checkNotNull(value) { check(value !== null || value !== undefined, 'Expected value to be not null') }

/** Assert an item's typename. */
function checkTypename(item, typename) { check(item.typename == typename, 'Selected item is not a ' + typename) }
