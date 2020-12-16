#target Illustrator

#include '../../.rootlib/sui2.js'
#include '../.lib/commons.js'

var dialog = new Dialog('Print PostScript')

dialog.setPositiveButton(function() {
})
dialog.setNegativeButton('Cancel')

dialog.show()