// Apply relink once to all selected `PlacedItem`,
// as opposed to native Illustrator `Relink...` which is done individually.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/relink.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same File', 'fill')
var pdfPanel, dimensionPanel
var pageEdit

var file = openFile(dialog.title, [
    ['Adobe Illustrator', 'AI'],
    ['Adobe PDF', 'PDF'],
    ['BMP', 'BMP'],
    ['GIF89a', 'GIF'],
    ['JPEG', 'JPG', 'JPE', 'JPEG'],
    ['JPEG2000', 'JPF', 'JPX', 'JP2', 'J2K', 'J2C', 'JPC'],
    ['PNG', 'PNG', 'PNS'],
    ['Photoshop', 'PSD', 'PSB', 'PDD'],
    ['TIFF', 'TIF', 'TIFF']
])

if (file != null) {
    var textBounds = [0, 0, 50, 21]
    var editBounds = [0, 0, 100, 21]

    if (file.isPDF()) {
        pdfPanel = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
        pdfPanel.main.hgroup(function(panel) {
            panel.setHelpTips('What page should be used when opening a multipage document.')
            panel.staticText(textBounds, 'Page:', JUSTIFY_RIGHT)
            pageEdit = group.editText(editBounds, '1', function(it) {
                it.validateDigits()
                it.active = true
            })
        })
    }

    dimensionPanel = new RelinkDimensionPanel(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        if (file.isPDF()) {
            var page = parseInt(pageEdit.text) || 1
            updatePDFPreferences(pdfPanel.getBoxType(), page)
        }
        items.forEach(function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            item.file = file
            if (dimensionPanel.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
        })
    })
    dialog.show()
}