// Resize all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Resize')

var prefill = selection.first()
var textBounds = [0, 0, 45, 21]
var editBounds = [0, 0, 150, 21]

dialog.resize = dialog.main.addVPanel(dialog.title)

dialog.width2 = dialog.resize.addHGroup()
dialog.width2.addText(textBounds, 'Width:', 'right')
dialog.widthEdit = dialog.width2.addEditText(editBounds, formatUnits(prefill.width, unitName, 2))
dialog.widthEdit.validateUnits()
dialog.widthEdit.active = true

dialog.height2 = dialog.resize.addHGroup()
dialog.height2.addText(textBounds, 'Height:', 'right')
dialog.heightEdit = dialog.height2.addEditText(editBounds, formatUnits(prefill.height, unitName, 2))
dialog.heightEdit.validateUnits()

dialog.bottom = dialog.main.addHGroup('fill')
dialog.change = new ItemChangePanel(dialog.bottom)
dialog.anchor = new ItemAnchorPanel(dialog.bottom)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnits(dialog.widthEdit.text)
    var height = parseUnits(dialog.heightEdit.text)
    selection.forEachItem(function(it) {
        var scaleX = 100 * width / it.width
        var scaleY = 100 * height / it.height
        if (scaleX != 100 && scaleY != 100) {
            it.resize(scaleX, 
                scaleY,
                dialog.change.isPositions(),
                dialog.change.isFillPatterns(),
                dialog.change.isFillGradients(),
                dialog.change.isStrokePattern(),
                100,
                dialog.anchor.getTransformation())
        }
    })
})
dialog.show()