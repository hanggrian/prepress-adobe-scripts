/**
 * FLaps will always be created on the left side of a vertical line or top side of a horizontal line.
 */

#target Illustrator
#include '../../.stdlib/sui-validator.js'
#include '../.lib/commons-colors.js'

checkSingleSelection()

var item = selection.first()
checkTypename(item, 'PathItem')

var dialog = new Dialog('Add Flap')

var textBounds = [0, 0, 60, 21]
var editBounds = [0, 0, 100, 21]

var flapOnClick = function() { dialog.scratches.enabled = dialog.flap.glueRadio.value}
dialog.flap = dialog.main.addHGroup()
dialog.flap.addText(textBounds, 'Flap type:', 'right')
dialog.flap.glueRadio = dialog.flap.addRadioButton(undefined, 'Glue')
dialog.flap.glueRadio.onClick = flapOnClick
dialog.flap.glueRadio.value = true
dialog.flap.tuckRadio = dialog.flap.addRadioButton(undefined, 'Tuck')
dialog.flap.tuckRadio.onClick = flapOnClick

dialog.length = dialog.main.addHGroup()
dialog.length.addText(textBounds, 'Length:', 'right')
dialog.lengthEdit = dialog.length.addEditText(editBounds, '20 mm')
dialog.lengthEdit.validateUnits()
dialog.lengthEdit.active = true

dialog.weight = dialog.main.addHGroup()
dialog.weight.addText(textBounds, 'Weight:', 'right')
dialog.weightEdit = dialog.weight.addEditText(editBounds, '1 pt')
dialog.weightEdit.validateUnits()

dialog.color = dialog.main.addHGroup()
dialog.color.addText(textBounds, 'Color:', 'right')
dialog.colorList = dialog.color.addDropDown(undefined, COLORS)
dialog.colorList.selection = 6

var scratchesTextBounds = [0, 0, 60, 21]
dialog.scratches = dialog.main.addVPanel('Glue Scratches')
dialog.scratches.dash = dialog.scratches.addHGroup()
dialog.scratches.dash.addText(scratchesTextBounds, 'Dash gap:', 'right')
dialog.scratches.dashEdit = dialog.scratches.dash.addEditText(editBounds, '4 pt')
dialog.scratches.dashEdit.validateUnits()
dialog.scratches.path = dialog.scratches.addHGroup()
dialog.scratches.path.addText(scratchesTextBounds, 'Path gap:', 'right')
dialog.scratches.pathEdit = dialog.scratches.path.addEditText(editBounds, '20 mm')
dialog.scratches.pathEdit.validateUnits()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { process() })
dialog.show()

function process() {
}