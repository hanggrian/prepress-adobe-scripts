#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var createdItems = []
items.forEach(function(it) {
    selection = [it] // isolate selection so that compound path are created individually
    var group = it.createOutline()
    for (var i = 0; i < group.compoundPathItems.length; i++) {
        var compoundPathItem = group.compoundPathItems[i]
        for (var j = 0; j < compoundPathItem.pathItems.length; j++) {
            compoundPathItem.pathItems[j].duplicate(document, ElementPlacement.PLACEATBEGINNING)
        }
    }
    group.remove()
    app.executeMenuCommand('compoundPath')
    createdItems.push(selection.first())
})
selection = createdItems