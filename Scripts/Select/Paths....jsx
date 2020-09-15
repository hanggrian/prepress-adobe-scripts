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

init('Select Paths')

var main = root.addHGroup()
main.alignChildren = 'top'

main.dimension = main.addVPanel('Dimension')
main.dimension.width = main.dimension.addHGroup()
main.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
var widthEdit = main.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
widthEdit.validateUnits()
widthEdit.active = true
main.dimension.height = main.dimension.addHGroup()
main.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
var heightEdit = main.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
heightEdit.validateUnits()

main.color = main.addVPanel('Color')
main.color.fill = main.color.addHGroup()
main.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = main.color.fill.add('dropdownlist', undefined, COLORS)
main.color.stroke = main.color.addHGroup()
main.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = main.color.stroke.add('dropdownlist', undefined, COLORS)

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