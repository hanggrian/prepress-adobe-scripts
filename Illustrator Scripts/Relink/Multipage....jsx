#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/order-by.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage', 'right')
var pdfPanel, rangeGroup, orderByGroup

var files = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && files.isNotEmpty()) {
    var collection = new FileCollection(files)

    if (collection.hasPDF) {
        pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    dialog.vpanel('PDF Pages', function(panel) {
        rangeGroup = new RangeGroup(panel, BOUNDS_TEXT, BOUNDS_EDIT).also(function(group) {
            group.startEdit.activate()
            group.endEdit.text = collection.length
        })
    })
    orderByGroup = new OrderByGroup(dialog.main, [ORDERS_DEFAULTS, ORDERS_POSITIONS]).also(function(group) {
        group.list.selectText('Reversed')
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var current = rangeGroup.getStart()
        var end = rangeGroup.getEnd()
        $.writeln('Items = ' + items.length)
        $.writeln('End index = ' + end)
        orderByGroup.forEach(items, function(item) {
            $.writeln('Current index = ' + current)
            var width = item.width
            var height = item.height
            var position = item.position
            var file = collection.get(current)
            if (file.isPDF() && item.isFileExists() && item.file.equalTo(file)) {
                $.writeln('Same PDF file, appling fix')
                item.file = getResource(R.png.blank)
            }
            item.file = file
            current++
            if (current > end) {
                current--
            }
            // maintain dimension
            item.width = width
            item.height = height
            item.position = position
        })
        selection = items
        $.writeln('Relink success')
    })
    dialog.show()
}