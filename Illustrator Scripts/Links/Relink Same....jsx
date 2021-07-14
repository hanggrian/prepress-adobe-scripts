#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/maintain-size.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same')
var pdfPanel, pageEdit, maintainSizeGroup

var file = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
])

if (file !== null) {
    dialog.vgroup(function(main) {
        if (file.isPDF()) {
            pdfPanel = new OpenPDFPanel(main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
                panel.main.hgroup(function(group) {
                    group.setTooltips('What page should be used when opening a multipage document')
                    group.staticText(BOUNDS_TEXT, 'Page:', JUSTIFY_RIGHT)
                    pageEdit = group.editText(BOUNDS_EDIT, '1', function(it) {
                        it.validateDigits()
                        it.activate()
                    })
                })
            })
        }
        maintainSizeGroup = new MaintainSizeGroup(main)
    })
    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        if (file.isPDF()) {
            var page = parseInt(pageEdit.text) - 1
            $.writeln('PDF page=' + page)
            preferences.setPDFPage(page)
        }
        items.forEach(function(item, i) {
            $.write(i + '. ')
            var width = item.width
            var height = item.height
            var position = item.position
            if (file.isPDF() && item.isFileExists() && item.file.isPDF()) {
                $.write('Appling PDF fix, ')
                item.file = getResource('relink_fix.png')
            }
            item.file = file
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
}