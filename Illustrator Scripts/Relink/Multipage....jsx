#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/relink.js'
#include '../.lib/ui/reverse-order.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage', 'fill')
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

    var textBounds = [0, 0, 70, 21]
    var editBounds = [0, 0, 100, 21]

    if (files.first().isPDF()) {
        dialog.pdf = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
        
        dialog.pdf.startPage = dialog.pdf.main.addHGroup()
        dialog.pdf.startPage.addText(textBounds, 'Start page:', 'right')
        dialog.pdf.startPageEdit = dialog.pdf.startPage.addEditText(editBounds, '1')
        dialog.pdf.startPageEdit.validateDigits()
        dialog.pdf.startPage.setTooltip('Beginning page of PDF file.')

        dialog.pdf.endPage = dialog.pdf.main.addHGroup()
        dialog.pdf.endPage.addText(textBounds, 'End page:', 'right')
        dialog.pdf.endPageEdit = dialog.pdf.endPage.addEditText(editBounds)
        dialog.pdf.endPageEdit.validateDigits()
        dialog.pdf.endPageEdit.active = true
        dialog.pdf.endPage.setTooltip('Final page of PDF file.')
    }

    dialog.dimension = new RelinkDimensionPanel(dialog.main)

    dialog.reverse = new ReverseOrderGroup(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var resetPage, currentPage, endPage
        if (files.first().isPDF()) {
            resetPage = function() { currentPage = parseInt(dialog.pdf.startPageEdit.text) || 1 }
            endPage = parseInt(dialog.pdf.endPageEdit.text) || 1
        } else { 
            resetPage = function() { currentPage = 0 }
            endPage = files.lastIndex()
        }
        resetPage()
        dialog.reverse.forEachAware(items, function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            if (files.first().isPDF()) {
                updatePDFPreferences(dialog.pdf.getBoxType(), currentPage++)
                item.file = files.first()
            } else {
                item.file = files[currentPage++]
            }
            if (dialog.dimension.isMaintain()) {
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