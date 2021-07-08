#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/maintain-size.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/order-by.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) {
    return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF()
})
check(items.isNotEmpty(), 'No PDF links found in selection')

var dialog = new Dialog('Change Page', 'right')
var pdfPanel, rangeGroup, orderByGroup, maintainSizeGroup

pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
    rangeGroup = new RangeGroup(panel.main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(group) {
        group.startEdit.activate()
        group.endEdit.text = '1'
    })
})
orderByGroup = new OrderByGroup(dialog.main, [ORDERS_DEFAULTS, ORDERS_POSITIONS]).also(function(group) {
    group.list.selectText('Reversed')
})
maintainSizeGroup = new MaintainSizeGroup(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var current = rangeGroup.getStart()
    var end = rangeGroup.getEnd()
    orderByGroup.forEach(items, function(item, i) {
        $.write(i + '. ')
        var width = item.width
        var height = item.height
        var position = item.position
        var file = item.file
        item.file = getResource('relink_fix.png') // Apply PDF fix
        preferences.setPDFPage(current)
        item.file = file
        current++
        if (current > end) {
            current--
        }
        if (maintainSizeGroup.isSelected()) {
            $.write('Keep size, ')
            item.width = width
            item.height = height
            item.position = position
        }
        $.writeln('Done')
    })
    selection = items
})
dialog.show()