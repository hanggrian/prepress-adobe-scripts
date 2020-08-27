/**
 * Select all PathItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'
#include '../.lib/units.js'
#include '../.lib/validator.js'

const BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
const BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = Dialog('Select paths')
dialog.root.horizontal()
dialog.root.alignChildren = 'top'

dialog.dimension = dialog.root.addVPanel('Dimension')
dialog.dimension.width = dialog.dimension.addHGroup()
dialog.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
var widthEdit = dialog.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
widthEdit.validateUnits()
widthEdit.active = true
dialog.dimension.height = dialog.dimension.addHGroup()
dialog.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
var heightEdit = dialog.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
heightEdit.validateUnits()

dialog.color = dialog.root.addVPanel('Color')
dialog.color.fill = dialog.color.addHGroup()
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.addAction('Cancel')
dialog.addAction('OK', function() {
    selectItems([SELECT_PATH], function(item) {
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
dialog.show()