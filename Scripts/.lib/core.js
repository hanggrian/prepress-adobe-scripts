/**
 * Core libraries have no fields.
 */

/** Returns true if this script is running on macOS. */
function isMacOS() { return $.os.toLowerCase().indexOf('mac') >= 0 }

/**
 * Assert that a condition is satisfied, throw an error otherwise.
 * @param {Boolean} requirement - expect value to be `true`
 * @param {String} errorMessage - nullable
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

/** 
 * Iterate each element of this list, doesn't work on array.
 * @param {Function} action - runnable to execute
 */
Object.prototype.forEach = function(action) {
    for (var i = 0; i < this.length; i++) {
        action(this[i], i)
    }
}

/**
 * Iterate each element of this list as reversed, doesn't work on array.
 * @param {Function} action - runnable to execute
 */
Object.prototype.forEachReversed = function(action) {
    for (var i = this.lastIndex(); i >= 0; i--) {
        action(this[i], i)
    }
}

/**
 * Last index of this list.
 * @return {Boolean}
 */
Object.prototype.lastIndex = function() { return this.length - 1 }

/**
 * Returns true if this list is empty.
 * @return {Boolean}
 */
Object.prototype.isEmpty = function() { return this.length == 0 }

/** 
 * Returns true if this list is not empty.
 * @return {Boolean}
 */
Object.prototype.isNotEmpty = function() { return this.length > 0 }

/**
 * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
 * @this {PageItem}
 * @return {PathItem}
 */
Object.prototype.getClippingPathItem = function() {
    if (this.typename == 'GroupItem' && this.clipped) {
        return this.pathItems[0]
    }
    return this
}