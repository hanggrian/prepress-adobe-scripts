#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'
#include '../.lib/strings.js'

// alert('This script is a work in progress.')

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

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
    var dialog = Dialog('Relink all')

    dialog.file = dialog.addHGroup('File')
    dialog.file.add('statictext', undefined, decodeURI(file.absoluteURI))
    
    dialog.addAction('Cancel')
    dialog.addAction('OK', function() { })
    
    dialog.show()
}