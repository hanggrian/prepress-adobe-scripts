// Multiply arts in 2-D fashion.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/dialog.js'
#include '../.lib/spreader.js'

checkSingleSelection()

var dialog = new Dialog('Spread')
var spreader = new Spreader()

dialog.spreader = spreader.getGroup(dialog.main)
spreader.horizontalEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() { spreader.spread() })
dialog.show()