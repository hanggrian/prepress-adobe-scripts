// Rotate all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Rotate')

dialog.line = dialog.main.addHGroup('top')
dialog.left = dialog.line.addVGroup()

var textBounds = [0, 0, 50, 21]
var editBounds = [0, 0, 100, 21]

dialog.angle = dialog.left.addHGroup()
dialog.angle.addText(textBounds, 'Angle:', 'right')
dialog.angleEdit = dialog.angle.addEditText(editBounds, '0')
dialog.angleEdit.validateDigits()
dialog.angleEdit.active = true

dialog.change = new ItemChange(dialog.left)

dialog.anchor = new ItemAnchor(dialog.line)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var angle = parseInt(dialog.angleEdit.text)
    if (angle != 0) {
        selection.forEachItem(function(it) {
            it.rotate(angle,
                dialog.change.isPositions(),
                dialog.change.isFillPatterns(),
                dialog.change.isFillGradients(),
                dialog.change.isStrokePattern(),
                dialog.anchor.getTransformation())
        })
    }
})
dialog.show()