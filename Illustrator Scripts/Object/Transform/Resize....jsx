// Resize all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Resize')

dialog.line = dialog.main.addHGroup('top')
dialog.left = dialog.line.addVGroup()

var textBounds = [0, 0, 50, 21]
var editBounds = [0, 0, 100, 21]

var prefill = selection.first()

dialog.width2 = dialog.left.addHGroup()
dialog.width2.addText(textBounds, 'Width:', 'right')
dialog.widthEdit = dialog.width2.addEditText(editBounds, formatUnit(prefill.width, 'mm', 2))
dialog.widthEdit.validateUnits()
dialog.widthEdit.active = true

dialog.height2 = dialog.left.addHGroup()
dialog.height2.addText(textBounds, 'Height:', 'right')
dialog.heightEdit = dialog.height2.addEditText(editBounds, formatUnit(prefill.height, 'mm', 2))
dialog.heightEdit.validateUnits()

dialog.change = new ItemChange(dialog.left)

dialog.anchor = new ItemAnchor(dialog.line)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnit(dialog.widthEdit.text)
    var height = parseUnit(dialog.heightEdit.text)
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