// Multiply arts in 2-D fashion.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/trim-marks.js'

checkSingleSelection()

var dialog = new Dialog('Spread', 'fill')

var enableTrimMarks = function() { dialog.trimMarks.main.enabled = true }
var disableTrimMarks = function() { dialog.trimMarks.main.enabled = false }

dialog.target = dialog.main.addHGroup()
dialog.target.addText(textBounds, 'Target:', 'right')
dialog.target.artworkCheck = dialog.target.addRadioButton(undefined, 'Artwork')
dialog.target.artworkCheck.value = true
dialog.target.artworkCheck.onClick = disableTrimMarks
dialog.target.trimMarksCheck = dialog.target.addRadioButton(undefined, 'Trim Marks')
dialog.target.trimMarksCheck.onClick = enableTrimMarks
dialog.target.bothCheck = dialog.target.addRadioButton(undefined, 'Both')
dialog.target.bothCheck.onClick = enableTrimMarks
dialog.target.setTooltip('Select which item to spread.')

var textBounds = [0, 0, 95, 21]
var editBounds = [0, 0, 100, 21]
var editBounds2 = [0, 0, 35, 21]

dialog.spread = dialog.main.addVPanel(dialog.title, 'fill')

dialog.spread.copies = dialog.spread.addHGroup()
dialog.spread.copies.addText(textBounds, 'Copies:', 'right')
dialog.spread.horizontalEdit = dialog.spread.copies.addEditText(editBounds2)
dialog.spread.horizontalEdit.validateDigits()
dialog.spread.horizontalEdit.active = true
dialog.spread.copies.addText(undefined, '×')
dialog.spread.verticalEdit = dialog.spread.copies.addEditText(editBounds2)
dialog.spread.verticalEdit.validateDigits()
dialog.spread.copies.setTooltip('2 dimension target.')

dialog.spread.gapHorizontal = dialog.spread.addHGroup()
dialog.spread.gapHorizontal.addText(textBounds, 'Horizontal Gap:', 'right')
dialog.spread.gapHorizontalEdit = dialog.spread.gapHorizontal.addEditText(editBounds, unitsOf('0 mm'))
dialog.spread.gapHorizontalEdit.validateUnits()
dialog.spread.gapHorizontal.setTooltip('Distance between arts horizontally.')

dialog.spread.gapVertical = dialog.spread.addHGroup()
dialog.spread.gapVertical.addText(textBounds, 'Vertical Gap:', 'right')
dialog.spread.gapVerticalEdit = dialog.spread.gapVertical.addEditText(editBounds, unitsOf('0 mm'))
dialog.spread.gapVerticalEdit.validateUnits()
dialog.spread.gapVertical.setTooltip('Distance between arts vertically.')

dialog.trimMarks = new TrimMarksPanel(dialog.main, textBounds, editBounds)
dialog.trimMarks.main.enabled = false

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var locations = []

    var horizontal = parseInt(dialog.spread.horizontalEdit.text) || 0
    var vertical = parseInt(dialog.spread.verticalEdit.text) || 0
    var gapHorizontal = parseUnits(dialog.spread.gapHorizontalEdit.text)
    var gapVertical = parseUnits(dialog.spread.gapVerticalEdit.text)

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
    if (!dialog.target.trimMarksCheck.value) {
        target.remove()
    }

    // vertical starts with 0 because the starting point doesn't change
    for (var v = 0; v < vertical; v++) {
        app.paste()
        var addedItem = selection.first()
        addedItem.position = [x, y - v * (height + gapVertical)]
        if (dialog.trimMarks.main.enabled) {
            locations = [LOCATION_LEFT_BOTTOM, LOCATION_LEFT_TOP]
            if (v == 0) {
                locations.push(LOCATION_TOP_LEFT, LOCATION_TOP_RIGHT)
            }
            if (v == vertical - 1) {
                locations.push(LOCATION_BOTTOM_LEFT, LOCATION_BOTTOM_RIGHT)
            }
            dialog.trimMarks.addToItem(addedItem, locations)
        }
        if (dialog.target.trimMarksCheck.value) {
            addedItem.remove()
        }
        
        for (var h = 1; h < horizontal; h++) {
            app.paste()
            addedItem = selection.first()
            addedItem.position = [x + h * (width + gapHorizontal), y - v * (height + gapVertical)]
            if (dialog.trimMarks.main.enabled) {
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
                dialog.trimMarks.addToItem(addedItem, locations)
            }
            if (dialog.target.trimMarksCheck.value) {
                addedItem.remove()
            }
        }
    }
})
dialog.show()