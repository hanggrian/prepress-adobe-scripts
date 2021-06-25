/**
 * FLaps will always be created on the left side of a vertical line or top side of a horizontal line.
 */

#target Illustrator
#include '../../.stdlib/sui-validator.js'
#include '../.lib/commons-colors.js'

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_SCRATCHES = [60, 21]

checkSingleSelection()

var item = selection.first()
checkTypename(item, 'PathItem')

var dialog = new Dialog('Add Flap')

var flapOnClick = function() { dialog.scratches.enabled = dialog.flap.glueRadio.value}
dialog.flap = dialog.main.addHGroup()
dialog.flap.addText(BOUNDS_TEXT, 'Flap type:', 'right')
dialog.flap.glueRadio = dialog.flap.addRadioButton(undefined, 'Glue')
dialog.flap.glueRadio.onClick = flapOnClick
dialog.flap.glueRadio.value = true
dialog.flap.tuckRadio = dialog.flap.addRadioButton(undefined, 'Tuck')
dialog.flap.tuckRadio.onClick = flapOnClick

dialog.length = dialog.main.addHGroup()
dialog.length.addText(BOUNDS_TEXT, 'Length:', 'right')
dialog.lengthEdit = dialog.length.addEditText(BOUNDS_EDIT, unitsOf('20 mm'))
dialog.lengthEdit.validateUnits()
dialog.lengthEdit.activate()

dialog.weight = dialog.main.addHGroup()
dialog.weight.addText(BOUNDS_TEXT, 'Weight:', 'right')
dialog.weightEdit = dialog.weight.addEditText(BOUNDS_EDIT, unitsOf('1 pt'))
dialog.weightEdit.validateUnits()

dialog.color = dialog.main.addHGroup()
dialog.color.addText(BOUNDS_TEXT, 'Color:', 'right')
dialog.colorList = dialog.color.addDropDown(undefined, COLORS)
dialog.colorList.selectText('Black')

dialog.scratches = dialog.main.addVPanel('Glue Scratches')
dialog.scratches.dash = dialog.scratches.addHGroup()
dialog.scratches.dash.addText(BOUNDS_SCRATCHES, 'Dash gap:', 'right')
dialog.scratches.dashEdit = dialog.scratches.dash.addEditText(editBounds, unitsOf('4 pt'))
dialog.scratches.dashEdit.validateUnits()
dialog.scratches.path = dialog.scratches.addHGroup()
dialog.scratches.path.addText(BOUNDS_SCRATCHES, 'Path gap:', 'right')
dialog.scratches.pathEdit = dialog.scratches.path.addEditText(editBounds, unitsOf('20 mm'))
dialog.scratches.pathEdit.validateUnits()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { process() })
dialog.show()

function process() {
}