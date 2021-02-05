// Increase canvas size and create new guide layout accordingly.

#target Photoshop
#include '../.lib/commons.js'
#include '../.lib/dialog.js'

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

dialog.flatten = dialog.main.addHGroup()
dialog.flatten.addText(textBounds, 'Content-Aware:', 'right')
dialog.flattenCheck = dialog.flatten.addCheckBox(undefined, 'Enable')
dialog.flatten.setTooltip('Layers will be flattened.')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    if (dialog.guideLayoutCheck.value) {
        document.guides.add(Direction.HORIZONTAL, 0)
        document.guides.add(Direction.HORIZONTAL, document.height)
        document.guides.add(Direction.VERTICAL, 0)
        document.guides.add(Direction.VERTICAL, document.width)
    }
    var bleed = UnitValue(dialog.bleedEdit.text) * 2
    document.resizeCanvas(document.width + bleed, document.height + bleed)
    if (dialog.flatten.value) {
        document.flatten()
    }
})
dialog.show()