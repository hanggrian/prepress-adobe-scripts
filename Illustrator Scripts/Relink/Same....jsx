#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var file = openFile('Relink Same', [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf'],
    ['BMP', 'bmp'],
    ['GIF89a', 'gif'],
    ['JPEG', 'jpg', 'jpe', 'jpeg'],
    ['JPEG2000', 'jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc'],
    ['PNG', 'png', 'pns'],
    ['Photoshop', 'psd', 'psb', 'pdd'],
    ['TIFF', 'tif', 'tiff']
])

if (file === null) {
    $.writeln('Relink canceled')
} else {
    if (!file.isPDF()) {
        relink()
    } else {
        var pdfPanel, pageEdit
        var dialog = new Dialog('Relink All', 'fill')
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
    items.forEach(function(item) {
        var width = item.width
        var height = item.height
        var position = item.position
        if (file.isPDF() && item.isFileExists() && item.file.equalTo(file)) {
            item.file = getResource(R.png.blank)
        }
        item.relink(file)
        // maintain dimension
        item.width = width
        item.height = height
        item.position = position
    })
    $.writeln('Relink success')
}