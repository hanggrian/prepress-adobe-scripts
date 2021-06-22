// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/select-dimension.js'

var YES_OR_NO = ['Yes', 'No']

var BOUNDS_LEFT_TEXT = [55, 21]
var BOUNDS_RIGHT_TEXT = [60, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Select Paths', 'fill')
var fillColorList, fillOverprintList
var strokeColorList, strokeWeightEdit, strokeDashedList, strokeOverprintList
var dimensionPanel
var clippingList, closedList, guidesList

dialog.main.orientation = 'row'
dialog.vgroup(function(topGroup) {
    topGroup.vpanel('Fill', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Fill color')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Color:', JUSTIFY_RIGHT)
            fillColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Will art beneath a filled object be overprinted?')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Overprint:', JUSTIFY_RIGHT)
            fillOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
    })
    topGroup.vpanel('Stroke', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Stroke color')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Color:', JUSTIFY_RIGHT)
            strokeColorList = group.dropDownList(BOUNDS_EDIT, COLORS)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Width of stroke')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Weight:', JUSTIFY_RIGHT)
            strokeWeightEdit = group.editText(BOUNDS_EDIT, undefined, function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Is the stroke dashed?')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Dashed:', JUSTIFY_RIGHT)
            strokeDashedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Will art beneath a stroked object be overprinted?')
            group.staticText(BOUNDS_RIGHT_TEXT, 'Overprint:', JUSTIFY_RIGHT)
            strokeOverprintList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
    })
})
dialog.vgroup(function(topGroup) {
    dimensionPanel = new SelectDimensionPanel(topGroup, BOUNDS_LEFT_TEXT, BOUNDS_EDIT)
    topGroup.vpanel('Others', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Should this be used as a clipping path?')
            group.staticText(BOUNDS_LEFT_TEXT, 'Clipping:', JUSTIFY_RIGHT)
            clippingList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Is this path closed?')
            group.staticText(BOUNDS_LEFT_TEXT, 'Closed:', JUSTIFY_RIGHT)
            closedList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
        panel.hgroup(function(group) {
            group.setTooltips('Is this path a guide object?')
            group.staticText(BOUNDS_LEFT_TEXT, 'Guides:', JUSTIFY_RIGHT)
            guidesList = group.dropDownList(BOUNDS_EDIT, YES_OR_NO)
        })
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
    var fillOverprint = fillOverprintList.hasSelection() ? fillOverprintList.selection.text === 'Yes' : undefined
    var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
    var strokeWeight = parseUnits(strokeWeightEdit.text)
    var strokeDashed = strokeDashedList.hasSelection() ? strokeDashedList.selection.text === 'Yes' : undefined
    var strokeOverprint = strokeOverprintList.hasSelection() ? strokeOverprintList.selection.text === 'Yes' : undefined
    var width = dimensionPanel.getWidth()
    var height = dimensionPanel.getHeight()
    var clipping = clippingList.hasSelection() ? clippingList.selection.text === 'Yes' : undefined
    var closed = closedList.hasSelection() ? closedList.selection.text === 'Yes' : undefined
    var guides = guidesList.hasSelection() ? guidesList.selection.text === 'Yes' : undefined
    selectAll(['PathItem'], function(item) {
        var condition = true
        if (width > 0) {
            condition = condition && parseInt(width) === parseInt(item.width)
        }
        if (height > 0) {
            condition = condition && parseInt(height) === parseInt(item.height)
        }
        if (clipping !== undefined) {
            condition = condition && clipping === item.clipping
        }
        if (closed !== undefined) {
            condition = condition && closed === item.closed
        }
        if (guides !== undefined) {
            condition = condition && guides === item.guides
        }
        if (fillColor !== undefined) {
            condition = condition && isColorEqual(fillColor, item.fillColor)
        }
        if (fillOverprint !== undefined) {
            condition = condition && fillOverprint === item.fillOverprint
        }
        if (strokeColor !== undefined) {
            condition = condition && isColorEqual(strokeColor, item.strokeColor)
        }
        if (strokeWeight > 0) {
            condition = condition && parseInt(strokeWeight) === parseInt(item.strokeWidth)
        }
        if (strokeDashed !== undefined) {
            condition = condition && strokeDashed === item.strokeDashes.isNotEmpty()
        }
        if (strokeOverprint !== undefined) {
            condition = condition && strokeOverprint === item.strokeOverprint
        }
        return condition
    })
})
dialog.show()