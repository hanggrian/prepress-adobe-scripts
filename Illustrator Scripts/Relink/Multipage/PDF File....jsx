#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/relink-options.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multiple (File)', 'fill')
var file = openFile(dialog.title, [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf']
])

if (file != null) {
    var textBounds = [0, 0, 70, 21]
    var editBounds = [0, 0, 100, 21]

    dialog.pdfOptions = new PdfOptionsPanel(dialog.main, textBounds, editBounds, false)

    dialog.multipageOptions = new MultipageOptionsPanel(dialog.main, textBounds, editBounds)

    dialog.dimension = dialog.main.addVPanel('Dimension')
    dialog.dimensionCheck = dialog.dimension.addCheckBox(undefined, 'Maintain size & position')
    dialog.dimension.setTooltip('Keep current dimension after relinking.')

    dialog.reverse = dialog.main.addVGroup()
    dialog.reverse.alignment = 'right'
    dialog.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')
    dialog.reverse.setTooltip('Iterate items at reverse order.')

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var currentPage = dialog.multipageOptions.getStartPage()
        var maxPage = dialog.multipageOptions.getEndPage()
        var func = function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            updatePDFPreferences(dialog.pdfOptions.getBoxType(), currentPage++)
            item.relink(file)
            if (dialog.dimensionCheck.value) {
                item.width = width
                item.height = height
                item.position = position
            }
            if (currentPage > maxPage) {
                currentPage = 1
            }
        }
        if (!dialog.reverseCheck.value) {
            items.forEach(func)
        } else {
            items.forEachReversed(func)
        }
    })
    dialog.show()
}