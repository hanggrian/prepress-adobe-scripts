// Multiply arts in 2-D fashion.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/item-spreader.js'

checkSingleSelection()

var dialog = new Dialog('Spread')

dialog.spreader = new ItemSpreaderGroup(dialog.main)
dialog.spreader.horizontalEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { dialog.spreader.spread() })
dialog.show()