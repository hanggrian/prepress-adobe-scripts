#target Illustrator
#include '../../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype Same Text')
var inputEdit

dialog.hgroup(function(group) {
    group.alignChildren = 'top'
    group.staticText(undefined, 'Content:')
    inputEdit = group.multilineEditText([0, 0, 400, 100], undefined, ACTIVE)
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    items.forEach(function(it) {
        it.words.removeAll()
        it.words.add(inputEdit.text)
    })
})
dialog.show()