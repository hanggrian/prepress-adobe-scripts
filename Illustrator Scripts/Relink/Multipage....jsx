#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage', 'fill')
var pdfPanel, rangeGroup, maintainGroup, reverseGroup

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

if (files !== null && files.isNotEmpty()) {
    if (files.filter(function(it) { return it.isPDF() }).isNotEmpty()) {
        check(files.length === 1, 'Only supports single PDF file')
    } else {
        check(files.length > 1, 'Only single image file selected, use Relink Same File instead')
    }

    if (files.first().isPDF()) {
        pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
        rangeGroup = new RangeGroup(pdfPanel.main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    maintainGroup = new MaintainDimensionGroup(dialog.main)
    reverseGroup = new ReverseOrderGroup(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var currentPage
        var resetPage = function() { currentPage = parseInt(rangeGroup.getStart()) }
        var endPage = parseInt(rangeGroup.getEnd().text)
        resetPage()
        reverseGroup.forEachAware(items, function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            if (files.first().isPDF()) {
                try {
                    // code below will throw error if PlacedItem file is missing, ignore for now
                    if (item.file !== undefined && item.file.equalTo(files.first())) {
                        item.file = getResource(R.png.blank)
                    }
                } catch (e) {
                    $.writeln(e.message)
                }
                preferences.setPDFPage(currentPage++)
                item.file = files.first()
            } else {
                item.file = files[currentPage++]
            }
            if (maintainGroup.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
            if (currentPage > endPage) {
                resetPage()
            }
        })
    })
    dialog.show()
}