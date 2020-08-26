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
dialog.root.alignChildren = 'top'

dialog.dimension = dialog.root.addPanel('Dimension')
dialog.dimension.width = dialog.dimension.add('group')
dialog.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
dialog.dimension.widthEdit = dialog.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
dialog.dimension.widthEdit.validateUnits()
dialog.dimension.widthEdit.active = true
dialog.dimension.height = dialog.dimension.add('group')
dialog.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
dialog.dimension.heightEdit = dialog.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
dialog.dimension.heightEdit.validateUnits()

dialog.color = dialog.root.addPanel('Color')
dialog.color.fill = dialog.color.add('group')
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
dialog.color.fillList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.add('group')
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
dialog.color.strokeList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.onAction(function() {
    selectItems([SELECT_PATH], function(item) {
        var condition = true
        var width = parseInt(parseUnit(dialog.dimension.widthEdit.text))
        if (width > 0) {
            condition = condition && width == parseInt(item.width)
        }
        var height = parseInt(parseUnit(dialog.dimension.heightEdit.text))
        if (height > 0) {
            condition = condition && height == parseInt(item.height)
        }
        if (dialog.color.fillList.selection != null) {
            condition = condition && item.fillColor.equalTo(parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && item.strokeColor.equalTo(parseColor(dialog.color.strokeList.selection.text))
        }
        return condition
    })
})
dialog.show()