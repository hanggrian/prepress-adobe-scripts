/**
 * Assert that a condition is satisfied, throw an error otherwise.
 * @param {Boolean} requirement expect value to be `true`
 * @param {String} errorMessage nullable
 * @return {void}
 */
function check(requirement, errorMessage) {
    if (!requirement) {
        if (errorMessage !== undefined) {
            throw errorMessage
        } else {
            throw 'Failed requirement'
        }
    }
}

/** Assert that a value is null. */
function checkNull(value) { check(value == null, 'Expected value to be null') }

/** Assert that a value is not null. */
function checkNotNull(value) { check(value != null, 'Expected value to be not null') }

/** Assert an item's typename. */
function checkTypename(item, typename) { check(item.typename == typename, 'Selected item is not a ' + typename) }
