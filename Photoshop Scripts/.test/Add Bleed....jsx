/**
 * Increase canvas size and create new guide layout accordingly. 
 */

#target Photoshop
#include '../../.rootlib/sui-validator.js'

createDialog('Add Bleed')

var textBounds = [0, 0, 95, 21]
var editBounds = [0, 0, 100, 21]

dialog.bleed = dialog.main.addHGroup()
dialog.bleed.addText(textBounds, 'Bleed:', 'right')
dialog.bleedEdit = dialog.bleed.addEditText(editBounds, '2.5 mm')
dialog.bleedEdit.validateUnits()
dialog.bleedEdit.active = true

dialog.guideLayout = dialog.main.addHGroup()
dialog.guideLayout.addText(textBounds, 'Guide Layout:', 'right')
dialog.guideLayoutCheck = dialog.guideLayout.addCheckBox()
dialog.guideLayoutCheck.value = true

dialog.contentAware = dialog.main.addHGroup()
dialog.contentAware.addText(textBounds, 'Content-Aware:', 'right')
dialog.contentAwareCheck = dialog.contentAware.addCheckBox()

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
})
show()