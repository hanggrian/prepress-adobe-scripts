/**
 * Multiply arts in 2-D fashion.
 */

#target Illustrator
#include '../.lib/duplicator.js'

checkSingleSelection()

var dialog = new Dialog('Duplicate')

dialog.duplicate = dialog.main.addDuplicateGroup()
dialog.duplicate.horizontalEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { dialog.duplicate.duplicate() })
dialog.show()