#target Illustrator
#include '../.lib/duplicate.js'
#include '../.lib/preconditions.js'
#include '../.lib/units.js'

const BOUNDS_EDIT = [0, 0, 80, 21]
const BOUNDS_PANEL_TEXT = [0, 0, 75, 21]
const BOUNDS_PANEL_EDIT = [0, 0, 35, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

var dialog = new Window('dialog', 'Duplicate')
dialog.alignChildren = 'fill'

dialog.duplication = dialog.add('group')
dialog.offset = dialog.add('group')
dialog.buttons = dialog.add('group')

dialog.duplication.add('statictext', BOUNDS_PANEL_TEXT, 'Duplication:').justify = 'right'
var horizontalEdit = dialog.duplication.add('edittext', BOUNDS_PANEL_EDIT)
horizontalEdit.active = true
horizontalEdit.justify = 'center' // find out why this doesn't work
dialog.duplication.add('statictext', undefined, 'x').justify = 'center'
var verticalEdit = dialog.duplication.add('edittext', BOUNDS_PANEL_EDIT)
verticalEdit.justify = 'center' // find out why this doesn't work

dialog.offset.add('statictext', BOUNDS_PANEL_TEXT, 'Offset:').justify = 'right'
var offsetEdit = dialog.offset.add('edittext', BOUNDS_EDIT)

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    var horizontal = parseInt(horizontalEdit.text) || 0
    var vertical = parseInt(verticalEdit.text) || 0
    var offset = parseUnit(offsetEdit.text)

    duplicate(horizontal, vertical, offset, function(item, h, v) { }, function(item, h, v) { })
}

dialog.show()