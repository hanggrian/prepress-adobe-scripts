#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/order-by.js'

var BOUNDS_DOCUMENT_TEXT = [60, 21]
var BOUNDS_DOCUMENT_EDIT = [120, 21]
var BOUNDS_DOCUMENT_EDIT2 = [50, 21]
var BOUNDS_DOCUMENT_EDITMAX = [120 + 50 + 10, 21]

check(document.artboards.length > 1, 'No other artboards')

var dialog = new Dialog('Reorder Artboards')
var orderByGroup = new OrderByGroup(dialog.main, [ORDERS_NAMES, ORDERS_POSITIONS]).also(function(group) {
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