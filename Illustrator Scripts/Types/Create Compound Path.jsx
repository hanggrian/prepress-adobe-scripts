#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

items.forEach(function(it) {
    var group = it.createOutline()
    for (var i = 0; i < group.compoundPathItems.length; i++) {
        var compoundPathItem = group.compoundPathItems[i]
        for (var j = 0; j < compoundPathItem.pathItems.length; j++) {
            compoundPathItem.pathItems[j].duplicate(document, ElementPlacement.PLACEATBEGINNING)
        }
    }
    group.remove()
    app.executeMenuCommand('compoundPath')
})