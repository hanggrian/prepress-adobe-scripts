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

var textBounds = [50, 21]
var editBounds = [100, 21]

dialog.split = dialog.main.addHGroup()
dialog.split.setHelpTips('Divide image horizontally/vertically.')
dialog.split.addText(textBounds, 'Split:', 'right')
dialog.splitHorizontalRadio = dialog.split.addRadioButton(undefined, 'Horizontal')
dialog.splitHorizontalRadio.value = true
dialog.splitVerticalRadio = dialog.split.addRadioButton(undefined, 'Vertical')

dialog.parts = dialog.main.addHGroup()
dialog.parts.setHelpTips('Total number of divison.')
dialog.parts.addText(textBounds, 'Parts:', 'right')
dialog.partsEdit = dialog.bleed.addEditText(editBounds, '2')
dialog.partsEdit.validateDigits()
dialog.partsEdit.activate()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    
})
dialog.show()
 */