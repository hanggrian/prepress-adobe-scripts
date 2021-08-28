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
    inputEdit = main.editText([400, 100], items.first().contents, { multiline: true }).also(ACTIVATE)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var input = inputEdit.text
    items.forEach(function(it) {
        it.contents = input
    })
})
dialog.show()