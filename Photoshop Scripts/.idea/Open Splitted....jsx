// Increase canvas size and create new guide layout accordingly.

/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/core.js'

var dialog = new Dialog('Open Splitted')
var files = openFile(dialog.title, [
    ['PNG', 'PNG', 'PNS']
], true)

/* 

var textBounds = [0, 0, 50, 21]
var editBounds = [0, 0, 100, 21]

dialog.split = dialog.main.addHGroup()
dialog.split.addText(textBounds, 'Split:', 'right')
dialog.splitHorizontalRadio = dialog.split.addRadioButton(undefined, 'Horizontal')
dialog.splitHorizontalRadio.value = true
dialog.splitVerticalRadio = dialog.split.addRadioButton(undefined, 'Vertical')
dialog.split.setTooltip('Divide image horizontally/vertically.')

dialog.parts = dialog.main.addHGroup()
dialog.parts.addText(textBounds, 'Parts:', 'right')
dialog.partsEdit = dialog.bleed.addEditText(editBounds, '2')
dialog.partsEdit.validateDigits()
dialog.partsEdit.active = true
dialog.parts.setTooltip('Total number of divison.')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    
})
dialog.show()
 */