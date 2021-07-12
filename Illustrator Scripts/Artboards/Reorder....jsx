#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/order-by.js'

check(document.artboards.length > 1, 'No other artboards')

var dialog = new Dialog('Reorder Artboards')
var orderByGroup

orderByGroup = new OrderByGroup(dialog.main, [ORDERS_NAMES, ORDERS_POSITIONS]).also(function(group) {
    group.list.selectText('Horizontal')
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