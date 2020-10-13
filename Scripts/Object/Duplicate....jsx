/**
 * Multiply arts in 2-D fashion.
 */

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui-duplicate.js'

var BOUNDS_TEXT = [0, 0, 50, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]
var BOUNDS_EDIT_SMALL = [0, 0, 36, 21]

checkSingleSelection()

createDialog('Duplicate')
var duplicate = dialog.main.addDuplicateGroup()
duplicate.horizontalEdit.active = true

setNegativeAction('Cancel')
setPositiveAction('OK', function() { duplicate() })
show()