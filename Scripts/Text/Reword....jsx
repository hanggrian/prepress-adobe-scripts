#target Illustrator
#include '../.lib/ui.js'

checkHasSelection()

init('Reword Texts')

root.input = root.addHGroup()
root.input.add('statictext', undefined, 'Text:')
var input = root.input.add('edittext', [0, 0, 400, 21])
input.active = true

addAction('Cancel')
addAction('OK', function() {
    selection.forEach(function(it) {
        if (it.typename == 'TextFrame') {
            var words = it.words
            words.removeAll()
            words.add(input.text)
        }
    })
})
show()