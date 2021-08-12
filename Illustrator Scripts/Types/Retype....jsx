#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype')
var inputEdit

dialog.hgroup(function(main) {
    main.alignChildren = 'top'
    main.staticText(undefined, 'Content:')
    inputEdit = main.editText([400, 100], undefined, { multiline: true }).also(ACTIVATE)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    items.forEach(function(it) {
        it.words.removeAll()
        it.words.add(inputEdit.text)
    })
})
dialog.show()