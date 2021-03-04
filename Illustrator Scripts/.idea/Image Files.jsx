#target Illustrator
#include '../../.lib/commons.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multipage (Images)', 'fill')
var file = openFile(dialog.title, [
    ['BMP', 'BMP'],
    ['GIF89a', 'GIF'],
    ['JPEG', 'JPG', 'JPE', 'JPEG'],
    ['JPEG2000', 'JPF', 'JPX', 'JP2', 'J2K', 'J2C', 'JPC'],
    ['PNG', 'PNG', 'PNS'],
    ['Photoshop', 'PSD', 'PSB', 'PDD'],
    ['TIFF', 'TIF', 'TIFF']
], true)

if (file !== null) {
    var textBounds = [0, 0, 70, 21]
    var editBounds = [0, 0, 100, 21]

    dialog.dimension = new RelinkDimensionPanel(dialog.main)

    dialog.reverse = dialog.main.addVGroup()
    dialog.reverse.alignment = 'right'
    dialog.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')
    dialog.reverse.setTooltip('Iterate items at reverse order.')

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var currentPage = 1
        var maxPage = dialog.pdfOptions.getPage()
        var func = function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            updatePDFPreferences(dialog.pdfOptions.getBoxType(), currentPage++)
            item.relink(file)
            if (dialog.dimension.isMaintain()) {
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