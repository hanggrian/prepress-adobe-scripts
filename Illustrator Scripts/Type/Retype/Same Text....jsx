#target Illustrator
#include '../../.lib/commons.js'

checkHasSelection()
var items = selection.mapItemNotNull(function(it) {
    return it.typename == 'TextFrame' ? it : null
})
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype Same Text')

dialog.input = dialog.main.addHGroup('top')
dialog.input.addText(undefined, 'Content:')
dialog.inputEdit = dialog.input.addEditText([0, 0, 400, 100], undefined, true)
dialog.inputEdit.active = true

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    items.forEach(function(it) {
        it.words.removeAll()
        it.words.add(dialog.inputEdit.text)
    })
})
dialog.show()