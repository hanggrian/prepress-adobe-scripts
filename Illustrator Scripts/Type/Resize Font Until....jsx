// Doesn't work on text with multiple font sizes.

#target Illustrator
#include '../.lib/commons.js'

checkSingleSelection()

var item = selection.first()
checkTypename(item, 'TextFrame')

var dialog = new Dialog('Resize Font Until')

var textBounds = [0, 0, 110, 21]

dialog.dimension = dialog.main.addHGroup()
dialog.dimension.addText(textBounds, 'Dimension:', 'right')
dialog.dimension.widthRadio = dialog.dimension.addRadioButton(undefined, 'Width')
dialog.dimension.widthRadio.value = true
dialog.dimension.heightRadio = dialog.dimension.addRadioButton(undefined, 'Height')
dialog.dimension.setTooltip('Selected text will match either width or height.')

dialog.dimensionSize = dialog.main.addHGroup()
dialog.dimensionSize.addText(textBounds, 'Dimension size:', 'right')
dialog.dimensionSizeEdit = dialog.dimensionSize.addEditText([0, 0, 100, 21], '0 mm')
dialog.dimensionSizeEdit.validateUnits()
dialog.dimensionSizeEdit.active = true
dialog.dimensionSize.setTooltip('Target size of the text.')

dialog.round = dialog.main.addHGroup()
dialog.round.addText(textBounds, 'Rounding method:', 'right')
dialog.roundRadio = dialog.round.addRadioButton(undefined, 'Round')
dialog.roundRadio.value = true
dialog.roundFloorRadio = dialog.round.addRadioButton(undefined, 'Floor')
dialog.roundNoneRadio = dialog.round.addRadioButton(undefined, 'None')
dialog.round.setTooltip('Round font size to nearest non-decimal number.')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var currentFont = item.textRange.characterAttributes.size
    var currentDimension = dialog.dimension.widthRadio.value
        ? item.width
        : item.height
    var targetDimension = parseUnit(dialog.dimensionSizeEdit.text)
    var targetFont = currentFont * targetDimension / currentDimension
    if (dialog.roundRadio.value) {
        targetFont = Math.round(targetFont)
    } else if (dialog.roundFloorRadio.value) {
        targetFont = Math.floor(targetFont)
    }
    item.textRange.characterAttributes.size = targetFont
})
dialog.show()