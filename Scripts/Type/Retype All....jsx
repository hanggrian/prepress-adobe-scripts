#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui.js'

checkHasSelection()

createDialog('Retype All')

dialog.input = dialog.main.addHGroup()
dialog.input.addText(undefined, 'Text:')
dialog.inputEdit = dialog.input.addEditText([0, 0, 400, 21])
dialog.inputEdit.active = true

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selection.forEach(function(it) {
        if (it.typename == 'TextFrame') {
            it.words.removeAll()
            it.words.add(dialog.inputEdit.text)
        }
    })
})
show()