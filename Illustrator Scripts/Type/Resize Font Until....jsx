// Doesn't work on text with multiple font sizes.

#target Illustrator
#include '../.lib/commons.js'

checkSingleSelection()

var item = selection.first()
checkTypename(item, 'TextFrame')

var dialog = new Dialog('Resize Font Until')
var widthRadio, heightRadio
var dimensionSizeEdit
var roundRadio, roundFloorRadio, roundNoneRadio

var textBounds = [0, 0, 110, 21]

dialog.hgroup(function(group) {
    group.staticText(textBounds, 'Dimension:', JUSTIFY_RIGHT)
    widthRadio = group.radioButton(undefined, 'Width', SELECTED)
    heightRadio = group.radioButton(undefined, 'Height')
    group.setTooltip('Selected text will match either width or height.')
})

dialog.hgroup(function(group) {
    group.staticText(textBounds, 'Dimension size:', JUSTIFY_RIGHT)
    dimensionSizeEdit = group.editText([0, 0, 100, 21], '0 ' + unitName, function(it) {
        it.validateUnits()
        it.active = true
    })
    group.setTooltip('Target size of the text.')
})

dialog.hgroup(function(group) {
    group.staticText(textBounds, 'Rounding method:', JUSTIFY_RIGHT)
    roundRadio = group.radioButton(undefined, 'Round', SELECTED)
    roundFloorRadio = group.radioButton(undefined, 'Floor')
    roundNoneRadio = group.radioButton(undefined, 'None')
    group.setTooltip('Round font size to nearest non-decimal number.')
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var currentFont = item.textRange.characterAttributes.size
    var currentDimension = widthRadio.value
        ? item.width
        : item.height
    var targetDimension = parseUnits(dimensionSizeEdit.text)
    var targetFont = currentFont * targetDimension / currentDimension
    if (roundRadio.value) {
        targetFont = Math.round(targetFont)
    } else if (roundFloorRadio.value) {
        targetFont = Math.floor(targetFont)
    }
    item.textRange.characterAttributes.size = targetFont
})
dialog.show()