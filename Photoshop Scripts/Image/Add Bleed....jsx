/**
 * Increase canvas size and create new guide layout accordingly. 
 */

#target Photoshop
#include '../.rootlib/sui.js'
#include '.lib/commons.js'

var dialog = new Dialog('Add Bleed')

var textBounds = [0, 0, 95, 21]
var editBounds = [0, 0, 100, 21]

dialog.bleed = dialog.main.addHGroup()
dialog.bleed.addText(textBounds, 'Bleed:', 'right')
dialog.bleedEdit = dialog.bleed.addEditText(editBounds, '2.5 mm')
dialog.bleedEdit.validateUnits()
dialog.bleedEdit.active = true
dialog.bleed.setTooltip('Bleed are distributed around image.')

dialog.guideLayout = dialog.main.addHGroup()
dialog.guideLayout.addText(textBounds, 'Guide Layout:', 'right')
dialog.guideLayoutCheck = dialog.guideLayout.addCheckBox(undefined, 'Enable')
dialog.guideLayoutCheck.value = true
dialog.guideLayout.setTooltip('Guides will mark where bleed are added.')

/*dialog.contentAware = dialog.main.addHGroup()
dialog.contentAware.addText(textBounds, 'Content-Aware:', 'right')
dialog.contentAwareCheck = dialog.contentAware.addCheckBox(undefined, 'Enable')
dialog.contentAware.setTooltip('Layers will be flattened, and bleed will be deleted as content-aware.')*/

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    if (dialog.guideLayoutCheck.value) {
        document.guides.add(Direction.HORIZONTAL, 0)
        document.guides.add(Direction.HORIZONTAL, document.height)
        document.guides.add(Direction.VERTICAL, 0)
        document.guides.add(Direction.VERTICAL, document.width)
    }
    var bleed = parseUnit(dialog.bleedEdit.text)
    document.resizeCanvas(
        document.width + bleed * 2,
        document.height + bleed * 2,
        AnchorPosition.MIDDLECENTER
    )
})
dialog.show()