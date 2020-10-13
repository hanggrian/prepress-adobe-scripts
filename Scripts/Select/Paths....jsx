/**
 * Select all PathItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/core-units.js'
#include '../.lib/commons-colors.js'
#include '../.lib/commons-select.js'
#include '../.lib/ui-validator.js'


var BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
var BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
var BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

allowSelectionType(SELECT_PATH)
allowSelectionType(SELECT_COMPOUND_PATH)

createDialog('Select Paths')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var dimension = dialog.line.addVPanel('Dimension')
dimension.width = dimension.addHGroup()
dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
dimension.widthEdit = dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
dimension.widthEdit.validateUnits()
dimension.widthEdit.active = true
dimension.height = dimension.addHGroup()
dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
dimension.heightEdit = dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
dimension.heightEdit.validateUnits()

var color = dialog.line.addVPanel('Color')
color.fill = color.addHGroup()
color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
color.fillList = color.fill.add('dropdownlist', undefined, COLORS)
color.stroke = color.addHGroup()
color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
color.strokeList = color.stroke.add('dropdownlist', undefined, COLORS)

setNegativeAction('Cancel')
setPositiveAction('OK', function() {
    selectAll(function(item) {
        var condition = true
        var width = parseInt(parseUnit(dimension.widthEdit.text))
        if (width > 0) condition = condition && width == parseInt(item.width)
        var height = parseInt(parseUnit(dimension.heightEdit.text))
        if (height > 0) condition = condition && height == parseInt(item.height)
        if (color.fillList.selection != null) {
            condition = condition && item.fillColor.equalTo(parseColor(color.fillList.selection.text))
        }
        if (color.strokeList.selection != null) {
            condition = condition && item.strokeColor.equalTo(parseColor(color.strokeList.selection.text))
        }
        return condition
    })
})
show()