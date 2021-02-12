// Rotate all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Rotate')

dialog.line = dialog.main.addHGroup('top')
dialog.left = dialog.line.addVGroup('fill')

var editBounds = [0, 0, 100, 21]

dialog.rotate = dialog.left.addVPanel(dialog.title)
dialog.angle = dialog.rotate.addHGroup()
dialog.angle.addText(undefined, 'Angle:', 'right')
dialog.angleEdit = dialog.angle.addEditText(editBounds, '0')
dialog.angleEdit.validateDigits()
dialog.angleEdit.active = true

dialog.change = new ItemChangePanel(dialog.left)

dialog.anchor = new ItemAnchorPanel(dialog.line)

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