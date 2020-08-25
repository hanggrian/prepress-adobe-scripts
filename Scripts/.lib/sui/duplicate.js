#include '../units.js'
#include '../validator.js'

const BOUNDS_DUPLICATE_TEXT = [0, 0, 65, 21]
const BOUNDS_DUPLICATE_EDIT = [0, 0, 100, 21]
const BOUNDS_DUPLICATE_EDIT_SMALL = [0, 0, 36, 21]

var duplicateHorizontalEdit
var duplicateVerticalEdit
var duplicateGapEdit

/**
 * Add duplicate layout to target.
 * 
 * @param {Object} target - a window, panel, or group
 * @return {void}
 */
function Duplicate(target) {
    target.orientation = 'column'

    target.copies = target.add('group')
    target.copies.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Copies:').justify = 'right'
    duplicateHorizontalEdit = target.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicateHorizontalEdit.validateDigits()
    target.copies.add('statictext', undefined, 'x')
    duplicateVerticalEdit = target.copies.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    duplicateVerticalEdit.validateDigits()
    
    target.gap = target.add('group')
    target.gap.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Gap:').justify = 'right'
    duplicateGapEdit = target.gap.add('edittext', BOUNDS_DUPLICATE_EDIT)
    duplicateGapEdit.validateUnits()
}


/**
 * Duplicate selected item, only support single selection.
 * 
 * @param {Function} horizontalRunnable - custom action that are executed during horizontal loop
 * @param {Function} verticalRunnable - custom action that are executed during vertical loop
 * @return {void}
 */
function duplicate(horizontalRunnable, verticalRunnable) {
    var horizontal = parseInt(duplicateHorizontalEdit.text) || 0
    var vertical = parseInt(duplicateVerticalEdit.text) || 0
    var gap = parseUnit(duplicateGapEdit.text)

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