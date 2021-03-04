#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/relink.js'
#include '../../.lib/ui/reverse-order.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage (PDF)', 'fill')
var file = openFile(dialog.title, [
    ['Adobe Illustrator', 'AI'],
    ['Adobe PDF', 'PDF']
])

if (file !== null) {
    var textBounds = [0, 0, 70, 21]
    var editBounds = [0, 0, 100, 21]

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

    dialog.dimension = new RelinkDimensionPanel(dialog.main)

    dialog.reverse = new ReverseOrderGroup(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var currentPage = parseInt(dialog.pdf.startPageEdit.text) || 1
        var maxPage = parseInt(dialog.pdf.endPageEdit.text) || 1
        dialog.reverse.forEachAware(items, function(item) {
            updatePDFPreferences(dialog.pdf.getBoxType(), currentPage++)
            var width = item.width
            var height = item.height
            var position = item.position
            item.relink(file)
            if (dialog.dimension.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
            if (currentPage > maxPage) {
                currentPage = 1
            }
        })
    })
    dialog.show()
}