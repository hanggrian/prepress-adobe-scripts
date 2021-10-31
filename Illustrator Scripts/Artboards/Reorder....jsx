#target Illustrator
#include '../.lib/commons.js'

check(document.artboards.length > 1, 'No other artboards')

var dialog = new Dialog('Reorder Artboards', 'reordering-resizing-artboards#reorder-artboards-f3')
var orderByGroup

dialog.vgroup(function(main) {
    orderByGroup = new OrderByGroup(main, [ORDER_NAMES, ORDER_POSITIONS]).also(function(it) {
        it.list.minimumSize.width = 230
        it.list.selectText('Horizontal')
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var properties = []
    orderByGroup.forEach(document.artboards, function(it) {
        properties.push(copyProperties(it))
    })
    document.artboards.forEach(function(it, i) {
        pasteProperties(properties[i], it)
    })
})
dialog.show()