check(app.documents.length > 0, 'No active document')

var document = app.activeDocument
var selection = document.selection

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

/** 
 * Assert that artboards are even numbered.
 * @return {void}
 */
function checkEvenArtboards() { check(document.artboards.length % 2 == 0, 'Odd number of pages') }

/**
 * Assert that artboards are odd numbered.
 * @return {void}
 */
function checkOddArtboards() { check(document.artboards.length % 2 != 0, 'Even number of pages') }

/**
 * Assert that document currently has any selection.
 * @return {void}
 */
function checkHasSelection() { check(selection != null && selection.length > 0, 'No selection') }

/**
 * Assert that document currently has single selection.
 * @return {void}
 */
function checkSingleSelection() {
    checkHasSelection(selection)
    check(selection.length == 1, 'Multiple selection is not supported')
}

/**
 * Assert that document currently has multiple selection.
 * @return {void}
 */
function checkMultipleSelection() {
    checkHasSelection(selection)
    check(selection.length > 1, 'Single selection is not supported')
}

/**
 * Assert an item's typename.
 * @return {void}
 */
function checkTypename(item, typename) {
    check(item.typename == typename, 'Selected item is not a ' + typename)
}

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