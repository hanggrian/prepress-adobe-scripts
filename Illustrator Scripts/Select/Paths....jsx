/**
 * Select all PathItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../../.rootlib/sui.js'
#include '../.lib/commons.js'

allowSelectionType(SELECT_PATH)
allowSelectionType(SELECT_COMPOUND_PATH)

var dialog = new Dialog('Select Paths')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var dimensionTextBounds = [0, 0, 45, 21]
var dimensionEditBounds = [0, 0, 100, 21]
dialog.dimension = dialog.line.addVPanel('Dimension')
dialog.dimension.width = dialog.dimension.addHGroup()
dialog.dimension.width.addText(dimensionTextBounds, 'Width:', 'right')
dialog.dimension.widthEdit = dialog.dimension.width.addEditText(dimensionEditBounds)
dialog.dimension.widthEdit.validateUnits()
dialog.dimension.widthEdit.active = true
dialog.dimension.height = dialog.dimension.addHGroup()
dialog.dimension.height.addText(dimensionTextBounds, 'Height:', 'right')
dialog.dimension.heightEdit = dialog.dimension.height.addEditText(dimensionEditBounds)
dialog.dimension.heightEdit.validateUnits()

var colorTextBounds = [0, 0, 45, 21]
dialog.color = dialog.line.addVPanel('Color')
dialog.color.fill = dialog.color.addHGroup()
dialog.color.fill.addText(colorTextBounds, 'Fill:', 'right')
dialog.color.fillList = dialog.color.fill.addDropDown(undefined, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.addText(colorTextBounds, 'Stroke:', 'right')
dialog.color.strokeList = dialog.color.stroke.addDropDown(undefined, COLORS)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(function(item) {
        var condition = true
        var width = parseUnit(dialog.dimension.widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) == parseInt(item.width)
        }
        var height = parseUnit(dialog.dimension.heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) == parseInt(item.height)
        }
        if (dialog.color.fillList.selection != null) {
            condition = condition && isColorEqual(item.fillColor, parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && isColorEqual(item.strokeColor, parseColor(dialog.color.strokeList.selection.text))
        }
        return condition
    })
})
dialog.show()