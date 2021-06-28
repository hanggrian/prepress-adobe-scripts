#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same')
var pdfPanel, pageEdit

var file = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
])

if (file !== null) {
    if (!file.isPDF()) {
        relink()
    } else {
        pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
        pdfPanel.main.hgroup(function(panel) {
            panel.setTooltips('What page should be used when opening a multipage document')
            panel.staticText(BOUNDS_TEXT, 'Page:', JUSTIFY_RIGHT)
            pageEdit = panel.editText(BOUNDS_EDIT, '1', function(it) {
                it.validateDigits()
                it.activate()
            })
        })
        dialog.setNegativeButton('Cancel')
        dialog.setPositiveButton(function() {
            preferences.setPDFPage(parseInt(pageEdit.text) - 1)
            relink()
        })
        dialog.show()
    }
}

function relink() {
    $.writeln('Items = ' + items.length)
    items.forEach(function(item, i) {
        $.writeln('Current index = ' + i)
        var width = item.width
        var height = item.height
        var position = item.position
        if (file.isPDF() && item.isFileExists() && item.file.equalTo(file)) {
            $.writeln('Same PDF file, appling fix')
            item.file = getResource(R.png.blank)
        }
        item.file = file
        // maintain dimension
        item.width = width
        item.height = height
        item.position = position
    })
    selection = items
    $.writeln('Relink success')
}