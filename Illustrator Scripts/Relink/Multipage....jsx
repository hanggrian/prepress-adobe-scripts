#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage', 'fill')
var pdfPanel, rangeGroup, reverseGroup

var files = openFile(dialog.title, [
    ['Adobe Illustrator', 'AI'],
    ['Adobe PDF', 'PDF'],
    ['BMP', 'BMP'],
    ['GIF89a', 'GIF'],
    ['JPEG', 'JPG', 'JPE', 'JPEG'],
    ['JPEG2000', 'JPF', 'JPX', 'JP2', 'J2K', 'J2C', 'JPC'],
    ['PNG', 'PNG', 'PNS'],
    ['Photoshop', 'PSD', 'PSB', 'PDD'],
    ['TIFF', 'TIF', 'TIFF']
], true)

if (files === null) {
    $.writeln('Relink canceled')
} else {
    if (files.filter(function(it) { return it.isPDF() }).isNotEmpty()) {
        check(files.length === 1, 'Only supports single PDF file')
    } else {
        check(files.length > 1, 'Only single image file selected, use Relink Same File instead')
    }

    if (files.first().isPDF()) {
        pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
        rangeGroup = new RangeGroup(pdfPanel.main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    reverseGroup = new ReverseOrderGroup(dialog.main, 'left')

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var current, end
        if (files.first().isPDF()) {
            current = rangeGroup.getStart()
            end = rangeGroup.getEnd()
        } else {
            current = 0
            end = files.lastIndex()
        }
        $.writeln('End index = ' + end)
        reverseGroup.forEachAware(items, function(item) {
            $.writeln('Current index = ' + current)
            var width = item.width
            var height = item.height
            var position = item.position
            if (files.first().isPDF()) {
                if (item.isFileExists() && item.file.equalTo(files.first())) {
                    item.file = getResource(R.png.blank)
                }
                preferences.setPDFPage(current++)
                item.relink(files.first())
            } else {
                item.relink(files[current++])
            }
            if (current > end) {
                current--
            }
            // maintain dimension
            item.width = width
            item.height = height
            item.position = position
        })
        $.writeln('Relink success')
    })
    dialog.show()
}