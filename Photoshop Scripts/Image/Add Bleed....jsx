// Increase canvas size and create new guide layout accordingly.

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed')

var textBounds = [0, 0, 70, 21]
var editBounds = [0, 0, 100, 21]

dialog.document = dialog.main.addHGroup()
dialog.document.addText(textBounds, 'Document:', 'right')
dialog.documentCurrentCheck = dialog.document.addRadioButton(undefined, 'Current')
dialog.documentCurrentCheck.value = true
dialog.documentAllCheck = dialog.document.addRadioButton(undefined, 'All')

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
dialog.flatten.addText(textBounds, 'Flatten:', 'right')
dialog.flattenCheck = dialog.flatten.addCheckBox(undefined, 'Enable')
dialog.flatten.setTooltip('Layers will be flattened.')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var isAll = dialog.documentAllCheck.value
    var bleed = UnitValue(dialog.bleedEdit.text) * 2
    var shouldAddGuide = dialog.guideLayoutCheck.value
    var shouldFlatten = dialog.flatten.value
    if (!isAll) {
        process(document, bleed, shouldAddGuide, shouldFlatten)
    } else {
        for (var i = 0; i < app.documents.length; i++) {
            app.activeDocument = app.documents[i]
            process(app.activeDocument, bleed, shouldAddGuide, shouldFlatten)            
        }
    }
})
dialog.show()

function process(document, bleed, shouldAddGuide, shouldFlatten) {
    if (shouldAddGuide) {
        document.guides.add(Direction.HORIZONTAL, 0)
        document.guides.add(Direction.HORIZONTAL, document.height)
        document.guides.add(Direction.VERTICAL, 0)
        document.guides.add(Direction.VERTICAL, document.width)
    }
    document.resizeCanvas(document.width + bleed, document.height + bleed)
    if (shouldFlatten) {
        document.flatten()
    }
}