// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select Paths')
var widthEdit, heightEdit
var fillList, strokeList
var clippingAnyCheck, clippingEnabledCheck, clippingDisabledCheck
var closedAnyCheck, closedEnabledCheck, closedDisabledCheck
var guidesAnyCheck, guidesEnabledCheck, guidesDisabledCheck

dialog.hgroup(function(mainGroup) {
    var lineTextBounds = [0, 0, 45, 21]
    var lineEditBounds = [0, 0, 100, 21]
    mainGroup.vpanel('Dimension', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(lineTextBounds, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(lineEditBounds, undefined, function(it) {
                it.validateUnits()
                it.active = true  
            })
        })
        panel.hgroup(function(group) {
            group.staticText(lineTextBounds, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(lineEditBounds, VALIDATE_UNITS)
        })
    })
    mainGroup.vpanel('Color', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(lineTextBounds, 'Fill:', JUSTIFY_RIGHT)
            fillList = group.dropDownList(lineEditBounds, COLORS)    
        })
        panel.hgroup(function(group) {
            group.staticText(lineTextBounds, 'Stroke:', JUSTIFY_RIGHT)
            strokeList = group.dropDownList(lineEditBounds, COLORS)  
        })
    })
})

dialog.vpanel('Properties', function(panel) {
    var propertiesTextBounds = [0, 0, 55, 21]
    panel.hgroup(function(group) {
        group.staticText(propertiesTextBounds, 'Clipping:', JUSTIFY_RIGHT)
        clippingAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        clippingEnabledCheck = group.radioButton(undefined, 'Enabled')
        clippingDisabledCheck = group.radioButton(undefined, 'Disabled')
        group.setTooltip('Should this be used as a clipping path?')
    })
    panel.hgroup(function(group) {
        group.staticText(propertiesTextBounds, 'Closed:', JUSTIFY_RIGHT)
        closedAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        closedEnabledCheck = group.radioButton(undefined, 'Enabled')
        closedDisabledCheck = group.radioButton(undefined, 'Disabled')
        group.setTooltip('Is this path closed?')
    })
    panel.hgroup(function(group) {
        group.staticText(propertiesTextBounds, 'Guides:', JUSTIFY_RIGHT)
        guidesAnyCheck = group.radioButton(undefined, 'Any', SELECTED)
        guidesEnabledCheck = group.radioButton(undefined, 'Enabled')
        guidesDisabledCheck = group.radioButton(undefined, 'Disabled')
        group.setTooltip('Is this path a guide object?')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(['PathItem', 'CompoundPathItem'], function(item) {
        var condition = true
        var width = parseUnits(widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) == parseInt(item.width)
        }
        var height = parseUnits(heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) == parseInt(item.height)
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