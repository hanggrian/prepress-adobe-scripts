// Multiply arts in 2-D fashion.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/trim-marks.js'

var BOUNDS_TEXT = [100, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_EDIT2 = [35, 21]

checkSingleSelection()

var dialog = new Dialog('Step and Repeat', 'fill')
var artworkCheck, trimMarksCheck, bothCheck
var horizontalEdit, verticalEdit, moveHorizontalEdit, moveVerticalEdit
var trimMarksPanel
var enableTrimMarks = function() { trimMarksPanel.main.enabled = true }
var disableTrimMarks = function() { trimMarksPanel.main.enabled = false }

dialog.hgroup(function(group) {
    group.setTooltips('Select which item to spread')
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
})

dialog.vpanel('Options', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setTooltips('2 dimension target')
        group.staticText(BOUNDS_TEXT, 'Copies:', JUSTIFY_RIGHT)
        horizontalEdit = group.editText(BOUNDS_EDIT2, undefined, VALIDATE_DIGITS)
        group.staticText(undefined, '×')
        verticalEdit = group.editText(BOUNDS_EDIT2, undefined, VALIDATE_DIGITS)
    })
    var target = selection.first().getClippingPathItem()
    panel.hgroup(function(group) {
        group.setTooltips('Distance between arts horizontally')
        group.staticText(BOUNDS_TEXT, 'Move Horizontal:', JUSTIFY_RIGHT)
        moveHorizontalEdit = group.editText(BOUNDS_EDIT, formatUnits(target.width, unitName, 2), VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
        group.setTooltips('Distance between arts vertically')
        group.staticText(BOUNDS_TEXT, 'Move Vertical:', JUSTIFY_RIGHT)
        moveVerticalEdit = group.editText(BOUNDS_EDIT, formatUnits(target.height, unitName, 2), VALIDATE_UNITS)
    })
})

trimMarksPanel = new TrimMarksPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
disableTrimMarks()

horizontalEdit.activate()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var locations = []

    var horizontal = parseInt(horizontalEdit.text) || 0
    var vertical = parseInt(verticalEdit.text) || 0
    var moveHorizontal = parseUnits(moveHorizontalEdit.text)
    var moveVertical = parseUnits(moveVerticalEdit.text)

    if (horizontal < 1 || vertical < 1) {
        errorWithAlert('Minimal value is 1×1')
        return
    }

    var target = selection.first()
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
        addedItem.position = [x, y - v * moveVertical]
        if (trimMarksPanel.main.enabled) {
            locations = [MARK_LEFT_BOTTOM, MARK_LEFT_TOP]
            if (v === 0) {
                locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
            }
            if (v === vertical - 1) {
                locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
            }
            trimMarksPanel.addToItem(addedItem, locations)
        }
        if (trimMarksCheck.value) {
            addedItem.remove()
        }

        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection.first()
            addedItem.position = [x + h * moveHorizontal, y - v * moveVertical]
            if (trimMarksPanel.main.enabled) {
                locations = []
                if (h === horizontal - 1) {
                    locations.push(MARK_RIGHT_TOP, MARK_RIGHT_BOTTOM)
                }
                if (v === 0) {
                    locations.push(MARK_TOP_LEFT, MARK_TOP_RIGHT)
                }
                if (v === vertical - 1) {
                    locations.push(MARK_BOTTOM_LEFT, MARK_BOTTOM_RIGHT)
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