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
        dialog.pdf = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
        
        dialog.pdf.page = dialog.pdf.main.addHGroup()
        dialog.pdf.page.addText(textBounds, 'Page:', 'right')
        dialog.pdf.pageEdit = dialog.pdf.page.addEditText(editBounds, '1')
        dialog.pdf.pageEdit.validateDigits()
        dialog.pdf.pageEdit.active = true
        dialog.pdf.page.setTooltip('What page should be used when opening a multipage document.')
    }

    dialog.dimension = new RelinkDimensionPanel(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        if (file.isPDF()) {
            var page = parseInt(dialog.pdf.pageEdit.text) || 1
            updatePDFPreferences(dialog.pdf.getBoxType(), page)
        }
        items.forEach(function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            item.file = file
            if (dialog.dimension.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
        })
    })
    dialog.show()
}