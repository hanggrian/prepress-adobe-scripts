#target Illustrator
#include '../.lib/commons.js'

var adobePPDs = app.PPDFileList.filter(function(it) { return it.name.startsWith('Adobe') })

var dialog = new Dialog('Print PostScript')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton('OK', function() {
    var options = new PrintJobOptions()
})
dialog.show()