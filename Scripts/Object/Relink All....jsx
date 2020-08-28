#target Illustrator
#include '../.lib/core-strings.js'
#include '../.lib/ui.js'

alert('This script is a work in progress.')

checkHasSelection()

for (var i = 0; i < selection.length; i++) {
    checkTypename(selection[i], 'PlacedItem')
}

var filters
if ($.os.toLowerCase().indexOf('mac') >= 0) {
    filters = function (file) {
        if (file instanceof Folder) {
            return true
        } else if (file.name.endsWith('.ai') || file.name.endsWith('.pdf') || 
                   file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.tif')) {
            return true
        }
        return false
    }
} else {
    filters = 'Adobe Illustrator:*.ai;Adobe PDF:*.pdf;JPEG:*.jpeg,*.jpg'
}
var file = File.openDialog('Relink all', filters)

if (file != null) {
    init('Relink all')

    root.file = root.addHGroup('File')
    root.file.add('statictext', undefined, decodeURI(file.absoluteURI))
    
    addAction('Cancel')
    addAction('OK', function() { })
    show()
}