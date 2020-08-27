#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

checkHasSelection()

var dialog = Dialog('Rename all')
dialog.input = dialog.root.addVPanel('Text')
var input = dialog.input.add('edittext', [0, 0, 400, 21])
input.active = true
dialog.addAction('Cancel')
dialog.addAction('OK', function() {
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename == 'TextFrame') {
            var words = selection[i].words
            words.removeAll()
            words.add(input.text)
        }
    }
})
dialog.show()