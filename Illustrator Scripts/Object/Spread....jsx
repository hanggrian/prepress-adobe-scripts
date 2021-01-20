/**
 * Multiply arts in 2-D fashion.
 */

#target Illustrator
#include '../.lib/spreader.js'

checkSingleSelection()

var dialog = new Dialog('Spread')

dialog.spreader = dialog.main.addSpreaderGroup()
dialog.spreader.horizontalEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { dialog.spreader.spread() })
dialog.show()