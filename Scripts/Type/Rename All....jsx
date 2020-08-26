#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

var dialog = Dialog('Rename all')
dialog.text2 = dialog.root.addPanel('Text')
dialog.textEdit = dialog.text2.add('edittext', [0, 0, 400, 21])
dialog.textEdit.active = true
dialog.onAction(function() {
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename == 'TextFrame') {
            var words = selection[i].words
            words.removeAll()
            words.add(edit.text)
        }
    }
})
dialog.show()