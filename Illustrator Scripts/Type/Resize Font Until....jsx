// Doesn't work on text with multiple font sizes.

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [110, 21]

checkSingleSelection()

var item = selection.first()
checkTypename(item, 'TextFrame')

var dialog = new Dialog('Resize Font Until')
var widthRadio, heightRadio
var dimensionSizeEdit
var roundRadio, roundFloorRadio, roundNoneRadio

dialog.hgroup(function(group) {
    group.setHelpTips('Selected text will match either width or height.')
    group.staticText(BOUNDS_TEXT, 'Dimension:', JUSTIFY_RIGHT)
    widthRadio = group.radioButton(undefined, 'Width', SELECTED)
    heightRadio = group.radioButton(undefined, 'Height')
})

dialog.hgroup(function(group) {
    group.setHelpTips('Target size of the text.')
    group.staticText(BOUNDS_TEXT, 'Dimension size:', JUSTIFY_RIGHT)
    dimensionSizeEdit = group.editText([100, 21], '0 ' + unitName, function(it) {
        it.validateUnits()
        it.activate()
    })
})

dialog.hgroup(function(group) {
    group.setHelpTips('Round font size to nearest non-decimal number.')
    group.staticText(BOUNDS_TEXT, 'Rounding method:', JUSTIFY_RIGHT)
    roundRadio = group.radioButton(undefined, 'Round', SELECTED)
    roundFloorRadio = group.radioButton(undefined, 'Floor')
    roundNoneRadio = group.radioButton(undefined, 'None')
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