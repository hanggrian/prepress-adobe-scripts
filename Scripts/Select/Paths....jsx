/**
 * Select all PathItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/ui-validator.js'
#include '../.lib/core-all.js'


var BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
var BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
var BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

allowSelectionType(SELECT_PATH)
allowSelectionType(SELECT_COMPOUND_PATH)

init('Select paths')
root.horizontal()
root.alignChildren = 'top'

root.dimension = root.addVPanel('Dimension')
root.dimension.width = root.dimension.addHGroup()
root.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
var widthEdit = root.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
widthEdit.validateUnits()
widthEdit.active = true
root.dimension.height = root.dimension.addHGroup()
root.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
var heightEdit = root.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
heightEdit.validateUnits()

root.color = root.addVPanel('Color')
root.color.fill = root.color.addHGroup()
root.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = root.color.fill.add('dropdownlist', undefined, COLORS)
root.color.stroke = root.color.addHGroup()
root.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = root.color.stroke.add('dropdownlist', undefined, COLORS)

addAction('Cancel')
addAction('OK', function() {
    selectAll(function(item) {
        var condition = true
        var width = parseInt(parseUnit(widthEdit.text))
        if (width > 0) condition = condition && width == parseInt(item.width)
        var height = parseInt(parseUnit(heightEdit.text))
        if (height > 0) condition = condition && height == parseInt(item.height)
        if (fillList.selection != null) condition = condition && item.fillColor.equalTo(parseColor(fillList.selection.text))
        if (strokeList.selection != null) condition = condition && item.strokeColor.equalTo(parseColor(strokeList.selection.text))
        return condition
    })
})
show()