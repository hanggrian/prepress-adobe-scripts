#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var dialog = new Dialog('Retype All')

dialog.input = dialog.main.addHGroup()
dialog.input.addText(undefined, 'Content:')
dialog.inputEdit = dialog.input.addEditText([0, 0, 400, 21])
dialog.inputEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selection.forEach(function(it) {
        if (it.typename == 'TextFrame') {
            it.words.removeAll()
            it.words.add(dialog.inputEdit.text)
        }
    })
})
dialog.show()