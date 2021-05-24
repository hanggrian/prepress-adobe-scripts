﻿// Direct replacement of `Object > Create Trim Marks` with some fixes:
// - If the selected art is a Path, trim marks will be created around **fill** as opposed to **stroke**.
// - If the selected art is a Clip Group, trim marks will be created around **clip size** as opposed to **content size**.
// 
// And also some enhancements:
// - Customize marks' appearance and placement.
// - Support for creating multiple marks by duplicating.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/trim-marks.js'

checkHasSelection()

var dialog = new Dialog('Add Trim Marks', 'fill')
var trimMarksPanel, locationsPanel

dialog.main.orientation = 'row'
trimMarksPanel = new TrimMarksPanel(dialog.main, [45, 21], [100, 21])
trimMarksPanel.offsetEdit.activate()
locationsPanel = new TrimMarkLocationsPanel(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { process(false) })
dialog.setNeutralButton(90, 'Delete', function() { process(true) })
dialog.show()

function process(isDelete) {
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
    if (isDelete) {
        selection.first().remove()
    }
    selection = marks
}