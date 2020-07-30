#target Illustrator
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection
var items = []

var dialog = new Window('dialog', 'Select texts')

dialog.buttons = dialog.add('group')
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

}

dialog.show()