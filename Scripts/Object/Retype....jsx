#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui.js'

checkHasSelection()

createDialog('Retype Texts')

var input = dialog.main.addHGroup()
input.add('statictext', undefined, 'Text:')
input.inputEdit = input.add('edittext', [0, 0, 400, 21])
input.inputEdit.active = true

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selection.forEach(function(it) {
        if (it.typename == 'TextFrame') {
            var words = it.words
            words.removeAll()
            words.add(input.inputEdit.text)
        }
    })
})
show()