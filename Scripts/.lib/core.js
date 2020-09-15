/**
 * Core libraries have no fields.
 */

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

/** Assert a value's nullability. */
function checkNotNull(value) { check(value != null, "Expected value to be not null") }

/** Assert that artboards are even numbered. */
function checkEvenArtboards() { check(document.artboards.length % 2 == 0, 'Odd number of pages') }

/** Assert that artboards are odd numbered. */
function checkOddArtboards() { check(document.artboards.length % 2 != 0, 'Even number of pages') }

/** Assert that document currently has any selection. */
function checkHasSelection() { check(selection != null && selection.length > 0, 'No selection') }

/** Assert that document currently has single selection. */
function checkSingleSelection() {
    checkHasSelection()
    check(selection.length == 1, 'Multiple selection is not supported')
}

/** Assert that document currently has multiple selection. */
function checkMultipleSelection() {
    checkHasSelection()
    check(selection.length > 1, 'Single selection is not supported')
}

/** Assert an item's typename. */
function checkTypename(item, typename) {
    check(item.typename == typename, 'Selected item is not a ' + typename)
}

/** Iterate each element of this list, doesn't work on array. */
Object.prototype.forEach = function(action) {
    for (var i = 0; i < this.length; i++) {
        action(this[i], i)
    }
}

/** Iterate each element of this list as reversed, doesn't work on array. */
Object.prototype.forEachReversed = function(action) {
    for (var i = this.lastIndex(); i >= 0; i--) {
        action(this[i], i)
    }
}

/** Last index of this list. */
Object.prototype.lastIndex = function() { return this.length - 1 }

/** Returns true if this list is empty. */
Object.prototype.isEmpty = function() { return this.length == 0 }

/** Returns true if this list is not empty. */
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