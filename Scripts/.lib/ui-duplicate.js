#include 'core-units.js'
#include 'ui-validator.js'

var BOUNDS_DUPLICATE_TEXT = [0, 0, 45, 21]
var BOUNDS_DUPLICATE_EDIT = [0, 0, 100, 21]
var BOUNDS_DUPLICATE_EDIT_SMALL = [0, 0, 36, 21]

var _duplicate

/**
 * Add duplicate layout to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {Group}
 */
Object.prototype.addDuplicateGroup = function() {
    var duplicate = this.addVGroup()

    duplicate.copies = duplicate.addHGroup()
    duplicate.copies.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Copies:').justify = 'right'
    duplicate.horizontalEdit = duplicate.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicate.horizontalEdit.validateDigits()
    duplicate.copies.add('statictext', undefined, 'x')
    duplicate.verticalEdit = duplicate.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicate.verticalEdit.validateDigits()

    duplicate.gap = duplicate.addHGroup()
    duplicate.gap.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Gap:').justify = 'right'
    duplicate.gapEdit = duplicate.gap.add('edittext', BOUNDS_DUPLICATE_EDIT)
    duplicate.gapEdit.validateUnits()
    
    _duplicate = duplicate
    return duplicate
}

/**
 * Duplicate selected item, only support single selection.
 * @param {Function} horizontalRunnable - nullable custom action
 * @param {Function} verticalRunnable - nullable custom action
 * @return {void}
 */
function duplicate(horizontalRunnable, verticalRunnable) {
    var horizontal = parseInt(_duplicate.horizontalEdit.text) || 0
    var vertical = parseInt(_duplicate.verticalEdit.text) || 0
    var gap = parseUnit(_duplicate.gapEdit.text)

    var target = selection[0]
    var clippingTarget = target.getClippingPathItem()
    var width = clippingTarget.width
    var height = clippingTarget.height
    var x = target.position[0]
    var y = target.position[1]

    app.copy()
    target.remove()

    // vertical is 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection[0]
        addedItem.position = [x, y - v * (height + gap)]
        if (verticalRunnable !== undefined) {
            verticalRunnable(addedItem, h, v)
        }

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection[0]
            addedItem.position = [x + h * (width + gap), y - v * (height + gap)]
            if (horizontalRunnable !== undefined) {
                horizontalRunnable(addedItem, h, v)
            }
        }
    }
}