// Multiply arts in 2-D fashion.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/trim-marks.js'

checkSingleSelection()

var dialog = new Dialog('Spread', 'fill')
var artworkCheck, trimMarksCheck, bothCheck
var horizontalEdit, verticalEdit, gapHorizontalEdit, gapVerticalEdit
var trimMarksPanel

var textBounds = [0, 0, 95, 21]
var editBounds = [0, 0, 100, 21]
var editBounds2 = [0, 0, 35, 21]
var enableTrimMarks = function() { trimMarksPanel.main.enabled = true }
var disableTrimMarks = function() { trimMarksPanel.main.enabled = false }

dialog.hgroup(function(group) {
    group.staticText(undefined, 'Target:', JUSTIFY_RIGHT)
    artworkCheck = group.radioButton(undefined, 'Artwork', function(it) {
        it.value = true
        it.onClick = disableTrimMarks
    })
    trimMarksCheck = group.radioButton(undefined, 'Trim Marks', function(it) {
        it.onClick = enableTrimMarks
    })
    bothCheck = group.radioButton(undefined, 'Both', function(it) {
        it.onClick = enableTrimMarks
    })
    group.setTooltip('Select which item to spread.')
})

dialog.vpanel(dialog.title, function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.staticText(textBounds, 'Copies:', JUSTIFY_RIGHT)
        horizontalEdit = group.editText(editBounds2, undefined, VALIDATE_DIGITS)
        group.staticText(undefined, '×')
        verticalEdit = group.editText(editBounds2, undefined, VALIDATE_DIGITS)
        group.setTooltip('2 dimension target.')
    })
    panel.hgroup(function(group) {
        group.staticText(textBounds, 'Horizontal Gap:', JUSTIFY_RIGHT)
        gapHorizontalEdit = group.editText(editBounds, unitsOf('0 mm'), VALIDATE_UNITS)
        group.setTooltip('Distance between arts horizontally.')
    })
    panel.hgroup(function(group) {
        group.staticText(textBounds, 'Vertical Gap:', JUSTIFY_RIGHT)
        gapVerticalEdit = group.editText(editBounds, unitsOf('0 mm'), VALIDATE_UNITS)
        group.setTooltip('Distance between arts vertically.')
    })
})

trimMarksPanel = new TrimMarksPanel(dialog.main, textBounds, editBounds)
trimMarksPanel.main.enabled = false

horizontalEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var locations = []

    var horizontal = parseInt(horizontalEdit.text) || 0
    var vertical = parseInt(verticalEdit.text) || 0
    var gapHorizontal = parseUnits(gapHorizontalEdit.text)
    var gapVertical = parseUnits(gapVerticalEdit.text)

    if (horizontal < 1 || vertical < 1) {
        alert('Minimal value is 1×1')
        return
    }

    var target = selection.first()
    var clippingTarget = target.getClippingPathItem()
    var width = clippingTarget.width
    var height = clippingTarget.height
    var x = target.position.first()
    var y = target.position[1]

    app.copy()
    if (!trimMarksCheck.value) {
        target.remove()
    }

    // vertical starts with 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection.first()
        addedItem.position = [x, y - v * (height + gapVertical)]
        if (trimMarksPanel.main.enabled) {
            locations = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (v == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            trimMarksPanel.addToItem(addedItem, locations)
        }
        if (trimMarksCheck.value) {
            addedItem.remove()
        }
        
        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection.first()
            addedItem.position = [x + h * (width + gapHorizontal), y - v * (height + gapVertical)]
            if (trimMarksPanel.main.enabled) {
                locations = []
                if (h == horizontal - 1) {
                    locations.push(LOCATION_RIGHT_TOP, LOCATION_RIGHT_BOTTOM)
                }
                if (v == 0) {
                    locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
                }
                if (v == vertical - 1) {
                    locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
                }
                trimMarksPanel.addToItem(addedItem, locations)
            }
            if (trimMarksCheck.value) {
                addedItem.remove()
            }
        }
    }
})
dialog.show()