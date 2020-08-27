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

var dialog = Dialog('Duplicate')
dialog.duplicate = dialog.root.addDuplicateGroup()
duplicateHEdit.active = true
dialog.addAction('Cancel')
dialog.addAction('OK', function() { duplicate() })
dialog.show()