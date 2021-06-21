// Direct replacement of `Object > Create Trim Marks` with some fixes:
// - If the selected art is a Path, trim marks will be created around **fill** as opposed to **stroke**.
// - If the selected art is a Clip Group, trim marks will be created around **clip size** as opposed to **content size**.
//
// And also some enhancements:
// - Customize marks' appearance and placement.
// - Support for creating multiple marks by duplicating.

#target Illustrator
#include '../.lib/commons.js'

var MARK_TOP_LEFT = 11
var MARK_TOP_RIGHT = 1
var MARK_RIGHT_TOP = 2
var MARK_RIGHT_BOTTOM = 4
var MARK_BOTTOM_RIGHT = 5
var MARK_BOTTOM_LEFT = 7
var MARK_LEFT_BOTTOM = 8
var MARK_LEFT_TOP = 10

checkHasSelection()

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_CHECK = [15, 15]

var dialog = new Dialog('Add Trim Marks (Single)', 'fill')
var offsetEdit, lengthEdit, weightEdit, colorList
var topLeftCheck, topRightCheck, leftTopCheck, rightTopCheck, leftBottomCheck, rightBottomCheck, bottomLeftCheck, bottomRightCheck // single checks
var topCheck, rightCheck, bottomCheck, leftCheck // multiple checks
var isMultiple

dialog.main.orientation = 'row'
dialog.vpanel('Trim Marks', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setTooltips('Distance between art and trim marks')
        group.staticText(BOUNDS_TEXT, 'Offset:', JUSTIFY_RIGHT)
        offsetEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    panel.hgroup(function(group) {
        group.setTooltips('Size of trim marks')
        group.staticText(BOUNDS_TEXT, 'Length:', JUSTIFY_RIGHT)
        lengthEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
        group.setTooltips('Thickness of trim marks')
        group.staticText(BOUNDS_TEXT, 'Weight:', JUSTIFY_RIGHT)
        weightEdit = group.editText(BOUNDS_EDIT, '0.3', VALIDATE_UNITS) // the same value used in `Object > Create Trim Marks`
    })
    panel.hgroup(function(group) {
        group.setTooltips('Color of trim marks')
        group.staticText(BOUNDS_TEXT, 'Color:', JUSTIFY_RIGHT)
        colorList = group.dropDownList(BOUNDS_EDIT, COLORS, function(it) {
            it.selection = COLORS.indexOf('Registration')
        })
    })
})
dialog.vpanel('Locations', function(panel) {
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHECK)
        topLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top left')
        })
        topCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top')
            it.visible = false
        })
        topRightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Top right')
        })
        group.staticText(BOUNDS_CHECK)
    })
    panel.hgroup(function(group) {
        leftTopCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left top')
        })
        group.staticText(BOUNDS_CHECK, '\u2196', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2191', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2197', JUSTIFY_CENTER)
        rightTopCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right top')
        })
    })
    panel.hgroup(function(group) {
        leftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left')
            it.visible = false
        })
        group.staticText(BOUNDS_CHECK, '\u2190', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u25CF', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2192', JUSTIFY_CENTER)
        rightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right')
            it.visible = false
        })
    })
    panel.hgroup(function(group) {
        leftBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Left bottom')
        })
        group.staticText(BOUNDS_CHECK, '\u2199', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2193', JUSTIFY_CENTER)
        group.staticText(BOUNDS_CHECK, '\u2198', JUSTIFY_CENTER)
        rightBottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Right bottom')
        })
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHECK)
        bottomLeftCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom left')
        })
        bottomCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom')
            it.visible = false
        })
        bottomRightCheck = group.checkBox(BOUNDS_CHECK, undefined, function(it) {
            it.select()
            it.setTooltip('Bottom right')
        })
        group.staticText(BOUNDS_CHECK)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var startX, startY, endX, endY
    selection.forEach(function(item) {
        var clippingItem = item.getClippingPathItem()
        var width = clippingItem.width
        var height = clippingItem.height
        var _startX = clippingItem.position.first()
        var _startY = clippingItem.position[1]
        var _endX = _startX + width
        var _endY = _startY - height
        if (startX === undefined || _startX < startX) startX = _startX
        if (startY === undefined || _startY > startY) startY = _startY
        if (endX === undefined || _endX > endX) endX = _endX
        if (endY === undefined || _endY < endY) endY = _endY
    })

    var marks = trimMarksPanel.addToBounds(startX, startY, endX, endY, locationsPanel.getLocations())
    selection = marks
})
if (selection.length > 1) {
    dialog.setNeutralButton(80, 'Multiple', function() {
        isMultiple = !isMultiple
        dialog.setTitle('Add Trim Marks (' + (isMultiple ? 'Multiple' : 'Single') + ')')
        dialog.neutralButton.text = isMultiple ? 'Single' : 'Multiple'
        topLeftCheck.visible = !isMultiple
        topRightCheck.visible = !isMultiple
        leftTopCheck.visible = !isMultiple
        rightTopCheck.visible = !isMultiple
        leftBottomCheck.visible = !isMultiple
        rightBottomCheck.visible = !isMultiple
        bottomLeftCheck.visible = !isMultiple
        bottomRightCheck.visible = !isMultiple
        leftCheck.visible = isMultiple
        topCheck.visible = isMultiple
        rightCheck.visible = isMultiple
        bottomCheck.visible = isMultiple
        return true
    })
}
dialog.show()
