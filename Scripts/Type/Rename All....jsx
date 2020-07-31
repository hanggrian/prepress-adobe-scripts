#target Illustrator
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

var dialog = new Window('dialog', 'Rename all')

dialog.main = dialog.add('panel', undefined, 'Text')
dialog.buttons = dialog.add('group')

dialog.main.add('group')
var edit = dialog.main.add('edittext', [0, 0, 400, 21])
edit.active = true

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()
    
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename == 'TextFrame') {
            var words = selection[i].words
            words.removeAll()
            words.add(edit.text)
        }
    }
}

dialog.show()