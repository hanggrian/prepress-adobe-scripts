// Rotate all items to target size regardless of their XY positions.

#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/anchor.js'

checkHasSelection()

var dialog = new Dialog('Rotate All')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'fill'
dialog.left = dialog.line.addVGroup()

var textBounds = [0, 0, 50, 21]
var editBounds = [0, 0, 100, 21]

dialog.angle = dialog.left.addHGroup()
dialog.angle.addText(textBounds, 'Angle:', 'right')
dialog.angleEdit = dialog.angle.addEditText(editBounds, '0')
dialog.angleEdit.validateDigits()
dialog.angleEdit.active = true

dialog.anchor = new Anchor(dialog.line)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selection.forEach(function(it) {
        it.width = parseUnit(dialog.widthEdit.text)
        it.height = parseUnit(dialog.heightEdit.text)
    })
})
dialog.show()