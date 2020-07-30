#target Illustrator
#include '../.lib/preconditions.js'

Window.alert('This script is a work in progress.')

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

for (var i = 0; i < selection.length; i++) {
    checkTypename(selection[i], 'PlacedItem')
}

// var filters
// if ($.os.toLowerCase().indexOf('mac') >= 0) {
// } else {
//     filters = 'JavaScript:*.jsx;All files:*.*'
// }

var file = File.openDialog('Relink all')

var dialog = new Window('dialog', 'Relink all')

dialog.file = dialog.add('panel', undefined, 'File')
dialog.file.orientation = 'row'

dialog.filePath = dialog.file.add('group')
var fileText = dialog.filePath.add('statictext', undefined, file.absoluteURI)
dialog.file.add('button', [0, 0, 32, 21], '...').onClick = function() {
    file = File.openDialog('Relink all')
    dialog.filePath.remove(fileText)
    fileText = dialog.filePath.add('statictext', undefined, file.absoluteURI)
}

dialog.buttons = dialog.add('group')
dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()
}

dialog.show()