#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/relink.js'
#include '../.lib/ui/reverse-order.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage', 'fill')
var pdfPanel, dimensionPanel, reverseGroup
var startPageEdit, endPageEdit

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
        pdfPanel = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
        pdfPanel.main.hgroup(function(group) {
            group.staticText(textBounds, 'Start page:', JUSTIFY_RIGHT)
            startPageEdit = group.editText(editBounds, '1', VALIDATE_DIGITS)
            group.setTooltip('Beginning page of PDF file.')
        })
        pdfPanel.main.hgroup(function(group) {
            group.staticText(textBounds, 'End page:', JUSTIFY_RIGHT)
            endPageEdit = group.editText(editBounds, undefined, function(it) {
                it.validateDigits()
                it.active = true  
            })
            group.setTooltip('Final page of PDF file.')
        })
    }

    dimensionPanel = new RelinkDimensionPanel(dialog.main)

    reverseGroup = new ReverseOrderGroup(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var resetPage, currentPage, endPage
        if (files.first().isPDF()) {
            resetPage = function() { currentPage = parseInt(startPageEdit.text) || 1 }
            endPage = parseInt(endPageEdit.text) || 1
        } else { 
            resetPage = function() { currentPage = 0 }
            endPage = files.lastIndex()
        }
        resetPage()
        reverseGroup.forEachAware(items, function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            if (files.first().isPDF()) {
                updatePDFPreferences(pdfPanel.getBoxType(), currentPage++)
                item.file = files.first()
            } else {
                item.file = files[currentPage++]
            }
            if (dimensionPanel.isMaintain()) {
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