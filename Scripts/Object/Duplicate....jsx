#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/sui/duplicate.js'
#include '../.lib/preconditions.js'
#include '../.lib/units.js'

const BOUNDS_TEXT = [0, 0, 50, 21]
const BOUNDS_EDIT = [0, 0, 100, 21]
const BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkSingleSelection()

var dialog = Dialog('Duplicate')
dialog.duplicate = dialog.root.addDuplicate()
dialog.duplicate.copiesHEdit.active = true
dialog.onAction(function() {
    duplicate(
        parseInt(dialog.duplicate.copiesHEdit.text) || 0,
        parseInt(dialog.duplicate.copiesVEdit.text) || 0,
        parseUnit(dialog.duplicate.gapEdit.text),
        function(_, _, _) { },
        function(_, _, _) { }
    )
})
dialog.show()