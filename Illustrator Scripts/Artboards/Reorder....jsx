#target Illustrator
#include '../.lib/commons.js'

check(document.artboards.length > 1, 'No other artboards')

var dialog = new Dialog('Reorder Artboards')
var orderByGroup

dialog.vgroup(function(main) {
    orderByGroup = new OrderByGroup(main, [ORDERS_NAMES, ORDERS_POSITIONS]).also(function(it) {
        it.list.selectText('Horizontal')
    })
})
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var properties = []
    orderByGroup.forEach(document.artboards, function(it) {
        properties.push(copyProperties(it))
    })
    document.artboards.forEach(function(it, i) {
        pasteProperties(properties[i], it)
    })
})
dialog.show()