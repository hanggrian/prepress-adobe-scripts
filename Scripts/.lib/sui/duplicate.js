#include '../validator.js'

const BOUNDS_DUPLICATE_TEXT = [0, 0, 45, 21]
const BOUNDS_DUPLICATE_EDIT = [0, 0, 100, 21]
const BOUNDS_DUPLICATE_EDIT_SMALL = [0, 0, 36, 21]

Group.prototype.addDuplicate || (Group.prototype.addDuplicate = function() { return createDuplicate(this) })
Panel.prototype.addDuplicate || (Panel.prototype.addDuplicate = function() { return createDuplicate(this) })

/**
 * Add duplicate layout to target.
 * 
 * @param {Object} target - a window, panel, or group
 * @return {Group}
 */
function createDuplicate(target) {
    var duplicate = target.add('group')
    duplicate.orientation = 'column'

    duplicate.copies = duplicate.add('group')
    duplicate.copies.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Copies:').justify = 'right'
    duplicate.copiesHEdit = duplicate.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicate.copiesHEdit.validateDigits()
    duplicate.copies.add('statictext', undefined, 'x')
    duplicate.copiesVEdit = duplicate.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicate.copiesVEdit.validateDigits()

    duplicate.gap = duplicate.add('group')
    duplicate.gap.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Gap:').justify = 'right'
    duplicate.gapEdit = duplicate.gap.add('edittext', BOUNDS_DUPLICATE_EDIT)
    duplicate.gapEdit.validateUnits()
    
    return duplicate
}

/**
 * Duplicate selected item, only support single selection.
 * 
 * @param {Number} horizontal - 
 * @param {Number} vertical - 
 * @param {Number} gap - 
 * @param {Function} horizontalRunnable - custom action that are executed during horizontal loop
 * @param {Function} verticalRunnable - custom action that are executed during vertical loop
 * @return {void}
 */
function duplicate(horizontal, vertical, gap, horizontalRunnable, verticalRunnable) {
    var selectedItem = selection[0]
    var width = selectedItem.width
    var height = selectedItem.height
    var x = selectedItem.position[0]
    var y = selectedItem.position[1]

    app.copy()
    selectedItem.remove()

    // vertical is 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection[0]
        addedItem.position = [x, y - v * (height + gap)]
        verticalRunnable(addedItem, h, v)

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection[0]
            addedItem.position = [x + h * (width + gap), y - v * (height + gap)]
            horizontalRunnable(addedItem, h, v)
        }
    }
}