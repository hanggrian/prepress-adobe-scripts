#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No links found in selection')

items.forEach(function(it) {
    var group = it.createOutline()
    var pathItems = new Array()
    for (var i = 0; i < group.compoundPathItems.length; i++) {
        var compoundPathItem = group.compoundPathItems[i]
        for (var j = 0; j < compoundPathItem.pathItems.length; j++) {
            var pathItem = compoundPathItem.pathItems[j]
            pathItems.push(pathItem.duplicate(document, ElementPlacement.PLACEATEND))
        }
    }
    group.remove()
    selection = pathItems
    app.executeMenuCommand('compoundPath')
})