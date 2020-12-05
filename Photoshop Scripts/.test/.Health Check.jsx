#target Illustrator
#include '../../.sharedlib/core-strings.js'
#include '../../.sharedlib/sui.js'
#include '../.lib/commons.js'

createDialog('Health Check')

var textBounds = [0, 0, 80, 21]

dialog.general = dialog.main.addVPanel('General')
dialog.general.colorMode = dialog.general.addHGroup()
dialog.general.colorMode.addText(textBounds, 'Color mode:', 'right')

setNegativeButton('Cancel')
setPositiveButton('OK', function() {

})
show()