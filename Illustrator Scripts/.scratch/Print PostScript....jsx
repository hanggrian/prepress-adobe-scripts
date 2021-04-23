#target Illustrator

#include '../../.stdlib/sui2.js'
#include '../.lib/commons.js'

var dialog = new Dialog('Print PostScript')

dialog.setPositiveButton(function() {
})
dialog.setNegativeButton('Cancel')

dialog.show()