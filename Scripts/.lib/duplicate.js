#include 'units.js'

const BOUNDS_DUPLICATE_TEXT = [0, 0, 65, 21]
const BOUNDS_DUPLICATE_EDIT = [0, 0, 100, 21]
const BOUNDS_DUPLICATE_EDIT_SMALL = [0, 0, 48, 21]
const BOUNDS_DUPLICATE_BUTTON = [0, 0, 16, 16]

const CHAR_DECREMENT = '﹤' // small greather-than sign
const CHAR_INCREMENT = '﹥' // small less-than sign

var duplicateHorizontalEdit
var duplicateVerticalEdit
var duplicateGapEdit

/**
 * Add duplicate layout to target.
 * 
 * @param {Object} target - a window, panel, or group
 * @return {void}
 */
function initDuplicate(target) {
    target.orientation = 'column'

    target.horizontal = target.add('group')
    target.horizontal.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Horizontal:').justify = 'right'
    target.horizontal.add('button', BOUNDS_DUPLICATE_BUTTON, CHAR_DECREMENT).onClick = function() {
        _decrement(duplicateHorizontalEdit)
    }
    duplicateHorizontalEdit = target.horizontal.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    target.horizontal.add('button', BOUNDS_DUPLICATE_BUTTON, CHAR_INCREMENT).onClick = function() {
        _increment(duplicateHorizontalEdit)
    }
    target.vertical = target.add('group')
    target.vertical.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Vertical:').justify = 'right'
    target.vertical.add('button', BOUNDS_DUPLICATE_BUTTON, CHAR_DECREMENT).onClick = function() {
        _decrement(duplicateVerticalEdit)
    }
    duplicateVerticalEdit = target.vertical.add('edittext', BOUNDS_DUPLICATE_EDIT_SMALL)
    target.vertical.add('button', BOUNDS_DUPLICATE_BUTTON, CHAR_INCREMENT).onClick = function() {
        _increment(duplicateVerticalEdit)
    }
    
    target.gap = target.add('group')
    target.gap.add('statictext', BOUNDS_DUPLICATE_TEXT, 'Gap:').justify = 'right'
    duplicateGapEdit = target.gap.add('edittext', BOUNDS_DUPLICATE_EDIT)
}

function _decrement(editText) {
    var value = (parseInt(editText.text) || 0) - 1
    if (value < 0) {
        value = 0
    }
    editText.text = value
}

function _increment(editText) {
    editText.text = (parseInt(editText.text) || 0) + 1
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