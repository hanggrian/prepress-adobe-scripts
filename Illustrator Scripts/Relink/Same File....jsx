// Apply relink once to all selected `PlacedItem`,
// as opposed to native Illustrator `Relink...` which is done individually.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/relink-options.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same File', 'fill')
var file = openFile(dialog.title, [
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

if (file != null) {
    var textBounds = [0, 0, 50, 21]
    var editBounds = [0, 0, 100, 21]

    if (file.isPDF()) {
        dialog.pdfOptions = new PdfOptionsPanel(dialog.main, textBounds, editBounds, true)
        dialog.pdfOptions.pageEdit.active = true
    }

    dialog.dimension = dialog.main.addVPanel('Dimension')
    dialog.dimensionCheck = dialog.dimension.addCheckBox(undefined, 'Maintain size & position')
    dialog.dimension.setTooltip('Keep current dimension after relinking.')

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        if (file.isPDF()) {
            updatePDFPreferences(dialog.pdfOptions.getBoxType(), dialog.pdfOptions.getPage())
        }
        items.forEach(function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            item.relink(file)
            if (dialog.dimensionCheck.value) {
                item.width = width
                item.height = height
                item.position = position
            }
        })
    })
    dialog.show()
}