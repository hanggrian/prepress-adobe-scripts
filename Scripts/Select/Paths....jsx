/**
 * Select all PathItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'
#include '../.lib/units.js'

const BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
const BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = new Window('dialog', 'Select paths')

dialog.main = dialog.add('group')
dialog.buttons = dialog.add('group')

dialog.main.alignChildren = 'fill'
dialog.dimension = dialog.main.add('panel', undefined, 'Dimension')
dialog.color = dialog.main.add('panel', undefined, 'Color')

dialog.dimension.add('group')
dialog.dimension.width = dialog.dimension.add('group')
dialog.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
var widthEdit = dialog.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
widthEdit.active = true
dialog.dimension.height = dialog.dimension.add('group')
dialog.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
var heightEdit = dialog.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)

dialog.color.add('group')
dialog.color.fill = dialog.color.add('group')
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillColorList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.add('group')
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeColorList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    selectItems([SELECT_PATH], function(item) {
        var condition = true
        
        var width = parseInt(parseUnit(widthEdit.text))
        if (width > 0) {
            condition = condition && width == parseInt(item.width)
        }
        var height = parseInt(parseUnit(heightEdit.text))
        if (height > 0) {
            condition = condition && height == parseInt(item.height)
        }
        if (fillColorList.selection != null) {
            condition = condition && sameColor(item.fillColor, parseColor(fillColorList.selection.text))
        }
        if (strokeColorList.selection != null) {
            condition = condition && sameColor(item.strokeColor, parseColor(strokeColorList.selection.text))
        }

        return condition
    })
}

dialog.show()