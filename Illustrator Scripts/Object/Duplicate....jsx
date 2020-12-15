/**
 * Multiply arts in 2-D fashion.
 */

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/sui-duplicator.js'

checkSingleSelection()

createDialog('Duplicate')

dialog.duplicate = dialog.main.addDuplicateGroup()
dialog.duplicate.horizontalEdit.active = true

setNegativeButton('Cancel')
setPositiveButton('OK', function() { dialog.duplicate.duplicate() })
show()