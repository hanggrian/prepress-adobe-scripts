// Rotate all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/item-transform.js'

checkHasSelection()

var dialog = new Dialog('Rotate')

var editBounds = [0, 0, 150, 21]

dialog.rotate = dialog.main.addVPanel(dialog.title)
dialog.angle = dialog.rotate.addHGroup()
dialog.angle.addText(undefined, 'Angle:', 'right')
dialog.angleEdit = dialog.angle.addEditText(editBounds, '0')
dialog.angleEdit.validateDigits()
dialog.angleEdit.active = true

dialog.bottom = dialog.main.addHGroup('fill')
dialog.change = new ItemChangePanel(dialog.bottom)
dialog.anchor = new ItemAnchorPanel(dialog.bottom)

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