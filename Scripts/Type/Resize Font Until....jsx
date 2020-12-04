/**
 * Doesn't work on text with multiple font sizes.
 */

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/core-units.js'
#include '../.lib/ui-validator.js'

checkSingleSelection()

var item = selection[0]

checkTypename(item, 'TextFrame')

createDialog('Resize Font Until')

var textBounds = [0, 0, 100, 21]

dialog.dimension = dialog.main.addHGroup()
dialog.dimension.addText(textBounds, 'Dimension:', 'right')
dialog.dimension.widthRadio = dialog.dimension.addRadioButton(undefined, 'Width')
dialog.dimension.widthRadio.value = true
dialog.dimension.heightRadio = dialog.dimension.addRadioButton(undefined, 'Height')

dialog.dimensionSize = dialog.main.addHGroup()
dialog.dimensionSize.addText(textBounds, 'Dimension size:', 'right')
dialog.dimensionSizeEdit = dialog.dimensionSize.addEditText([0, 0, 100, 21], '0 mm')
dialog.dimensionSizeEdit.validateUnits()
dialog.dimensionSizeEdit.active = true

dialog.roundFont = dialog.main.addHGroup()
dialog.roundFont.addText(textBounds, 'Round font size:', 'right')
dialog.roundFontCheck = dialog.roundFont.addCheckBox()
dialog.roundFontCheck.value = true

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    var currentFont = item.textRange.characterAttributes.size
    var currentDimension = dialog.dimension.widthRadio.value
        ? item.width
        : item.height
    var targetDimension = parseUnit(dialog.dimensionSizeEdit.text)
    var targetFont = currentFont * targetDimension / currentDimension
    if (dialog.roundFontCheck.value) {
        targetFont = parseInt(targetFont)
    }
    item.textRange.characterAttributes.size = targetFont
})
show()