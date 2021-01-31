// Resize all items to target size regardless of their XY positions.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/dialog.js'

checkHasSelection()

var dialog = new Dialog('Resize All')

var textBounds = [0, 0, 50, 21]
var editBounds = [0, 0, 150, 21]

var prefill = selection.first()

dialog.width2 = dialog.main.addHGroup()
dialog.width2.addText(textBounds, 'Width:', 'right')
dialog.widthEdit = dialog.width2.addEditText(editBounds, formatUnit(prefill.width, 'mm'))
dialog.widthEdit.validateUnits()
dialog.widthEdit.active = true

dialog.height2 = dialog.main.addHGroup()
dialog.height2.addText(textBounds, 'Height:', 'right')
dialog.heightEdit = dialog.height2.addEditText(editBounds, formatUnit(prefill.height, 'mm'))
dialog.heightEdit.validateUnits()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selection.forEach(function(it) {
        it.width = parseUnit(dialog.widthEdit.text)
        it.height = parseUnit(dialog.heightEdit.text)
    })
})
dialog.show()