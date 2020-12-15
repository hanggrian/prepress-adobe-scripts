#include '../../.rootlib/sui-validator.js'
#include '../.lib/core-units.js'

var duplicateTextBounds = [0, 0, 95, 21]
var duplicateEditBounds = [0, 0, 100, 21]
var duplicateEditBounds2 = [0, 0, 36, 21]

/**
 * Add duplicate layout to target.
 * @this {Object} - may be a Group, Panel, or Window
 * @return {Group}
 */
Object.prototype.addDuplicateGroup = function() {
    var duplicate = this.addVGroup()

    duplicate.copies = duplicate.addHGroup()
    duplicate.copies.addText(duplicateTextBounds, 'Copies:', 'right')
    duplicate.horizontalEdit = duplicate.copies.addEditText(duplicateEditBounds2)
    duplicate.horizontalEdit.validateDigits()
    duplicate.copies.addText(undefined, 'x')
    duplicate.verticalEdit = duplicate.copies.addEditText(duplicateEditBounds2)
    duplicate.verticalEdit.validateDigits()
    duplicate.copies.setTooltip('2 dimension target.')

    duplicate.gapHorizontal = duplicate.addHGroup()
    duplicate.gapHorizontal.addText(duplicateTextBounds, 'Horizontal Gap:', 'right')
    duplicate.gapHorizontalEdit = duplicate.gapHorizontal.addEditText(duplicateEditBounds, '0 mm')
    duplicate.gapHorizontalEdit.validateUnits()
    duplicate.gapHorizontal.setTooltip('Distance between arts horizontally.')

    duplicate.gapVertical = duplicate.addHGroup()
    duplicate.gapVertical.addText(duplicateTextBounds, 'Vertical Gap:', 'right')
    duplicate.gapVerticalEdit = duplicate.gapVertical.addEditText(duplicateEditBounds, '0 mm')
    duplicate.gapVerticalEdit.validateUnits()
    duplicate.gapVertical.setTooltip('Distance between arts vertically.')

    return duplicate
}

/**
 * Duplicate selected item, only support single selection.
 * @param {Function} horizontalRunnable - nullable custom action
 * @param {Function} verticalRunnable - nullable custom action
 */
Object.prototype.duplicate = function(horizontalRunnable, verticalRunnable) {
    var horizontal = parseInt(this.horizontalEdit.text) || 0
    var vertical = parseInt(this.verticalEdit.text) || 0
    var gapHorizontal = parseUnit(this.gapHorizontalEdit.text)
    var gapVertical = parseUnit(this.gapVerticalEdit.text)

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
        addedItem.position = [x, y - v * (height + gapVertical)]
        if (verticalRunnable !== undefined) {
            verticalRunnable(addedItem, h, v)
        }

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection[0]
            addedItem.position = [x + h * (width + gapHorizontal), y - v * (height + gapVertical)]
            if (horizontalRunnable !== undefined) {
                horizontalRunnable(addedItem, h, v)
            }
        }
    }
}