#target Illustrator
#include '../.lib/sui/duplicate.js'
#include '../.lib/preconditions.js'

const BOUNDS_TEXT = [0, 0, 50, 21]
const BOUNDS_EDIT = [0, 0, 100, 21]
const BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

var dialog = new Window('dialog', 'Duplicate')
dialog.alignChildren = 'fill'

dialog.main = dialog.add('group')
Duplicate(dialog.main)
duplicateHorizontalEdit.active = true

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    duplicate(function(item, h, v) { }, function(item, h, v) { })
}

dialog.show()