// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_LINE_TEXT = [45, 21]
var BOUNDS_LINE_EDIT = [100, 21]
var BOUNDS_PROPERTIES_TEXT = [55, 21]

var dialog = new Dialog('Select Paths')
var widthEdit, heightEdit
var fillList, strokeList
var clippingAnyCheck, clippingEnabledCheck, clippingDisabledCheck
var closedAnyCheck, closedEnabledCheck, closedDisabledCheck
var guidesAnyCheck, guidesEnabledCheck, guidesDisabledCheck

dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'fill'
    mainGroup.vpanel('Dimension', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LINE_TEXT, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_LINE_EDIT, undefined, function(it) {
                it.validateUnits()
                it.activate()  
            })
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LINE_TEXT, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_LINE_EDIT, undefined, VALIDATE_UNITS)
        })
    })
    mainGroup.vpanel('Color', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LINE_TEXT, 'Fill:', JUSTIFY_RIGHT)
            fillList = group.dropDownList(BOUNDS_LINE_EDIT, COLORS)    
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LINE_TEXT, 'Stroke:', JUSTIFY_RIGHT)
            strokeList = group.dropDownList(BOUNDS_LINE_EDIT, COLORS)  
        })
    })
})

dialog.vpanel('Properties', function(panel) {
    panel.hgroup(function(group) {
        group.setHelpTips('Should this be used as a clipping path?')
        group.staticText(BOUNDS_PROPERTIES_TEXT, 'Clipping:', JUSTIFY_RIGHT)
        clippingAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        clippingEnabledCheck = group.radioButton(undefined, 'Enabled')
        clippingDisabledCheck = group.radioButton(undefined, 'Disabled')
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Is this path closed?')
        group.staticText(BOUNDS_PROPERTIES_TEXT, 'Closed:', JUSTIFY_RIGHT)
        closedAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        closedEnabledCheck = group.radioButton(undefined, 'Enabled')
        closedDisabledCheck = group.radioButton(undefined, 'Disabled')
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Is this path a guide object?')
        group.staticText(BOUNDS_PROPERTIES_TEXT, 'Guides:', JUSTIFY_RIGHT)
        guidesAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        guidesEnabledCheck = group.radioButton(undefined, 'Enabled')
        guidesDisabledCheck = group.radioButton(undefined, 'Disabled')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(['PathItem', 'CompoundPathItem'], function(item) {
        var condition = true
        var width = parseUnits(widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) === parseInt(item.width)
        }
        var height = parseUnits(heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) === parseInt(item.height)
        }
        if (fillList.selection != null) {
            condition = condition && isColorEqual(item.fillColor, parseColor(fillList.selection.text))
        }
        if (strokeList.selection != null) {
            condition = condition && isColorEqual(item.strokeColor, parseColor(strokeList.selection.text))
        }
        if (!clippingAnyCheck.value) {
            condition = condition && clippingEnabledCheck.value
                ? item.clipping
                : !item.clipping
        }
        if (!closedAnyCheck.value) {
            condition = condition && closedEnabledCheck.value
                ? item.closed
                : !item.closed
        }
        if (!guidesAnyCheck.value) {
            condition = condition && guidesEnabledCheck.value
                ? item.guides
                : !item.guides
        }
        return condition
    })
})
dialog.show()