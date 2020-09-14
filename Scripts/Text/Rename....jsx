#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui.js'

checkHasSelection()

init('Rename Texts')

root.input = root.addHGroup()
root.input.add('statictext', undefined, 'Text:')
var input = root.input.add('edittext', [0, 0, 400, 21])
input.active = true

addAction('Cancel')
addAction('OK', function() {
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename == 'TextFrame') {
            var words = selection[i].words
            words.removeAll()
            words.add(input.text)
        }
    }
})
show()