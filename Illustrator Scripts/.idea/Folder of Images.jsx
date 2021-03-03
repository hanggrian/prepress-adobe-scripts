#target Illustrator
#include '../../.lib/commons.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Multiple (Folder)', 'fill')
var folder = openFolder(dialog.title)

if (folder != null) {
    var textBounds = [0, 0, 60, 21]
    var editBounds = [0, 0, 100, 21]

    dialog.folderOptions = dialog.main.addVPanel('Folder Options')

    dialog.folderOptions.startsAt = dialog.folderOptions.addHGroup()
    dialog.folderOptions.startsAt.addText(textBounds, 'Starts at:', 'right')
    dialog.folderOptions.startsAtEdit = dialog.folderOptions.startsAt.addEditText(editBounds, '1')
    dialog.folderOptions.startsAtEdit.validateDigits()
    dialog.folderOptions.startsAt.setTooltip('Starting counter.')

    dialog.folderOptions.endsAt = dialog.folderOptions.addHGroup()
    dialog.folderOptions.endsAt.addText(textBounds, 'Ends at:', 'right')
    dialog.folderOptions.endsAtEdit = dialog.folderOptions.endsAt.addEditText(editBounds)
    dialog.folderOptions.endsAtEdit.validateDigits()
    dialog.folderOptions.endsAtEdit.active = true
    dialog.folderOptions.endsAt.setTooltip('Ending counter.')

    dialog.folderOptions.digits = dialog.folderOptions.addHGroup()
    dialog.folderOptions.digits.addText(textBounds, 'Digits:', 'right')
    dialog.folderOptions.digitsEdit = dialog.folderOptions.digits.addEditText(editBounds)
    dialog.folderOptions.digitsEdit.validateDigits()
    dialog.folderOptions.digits.setTooltip('Put n number of zeroes, can be left empty.')

    dialog.folderOptions.prefix = dialog.folderOptions.addHGroup()
    dialog.folderOptions.prefix.addText(textBounds, 'Prefix:', 'right')
    dialog.folderOptions.prefixEdit = dialog.folderOptions.prefix.addEditText(editBounds)
    dialog.folderOptions.prefix.setTooltip('Extra text before file name, can be left empty.')

    dialog.folderOptions.suffix = dialog.folderOptions.addHGroup()
    dialog.folderOptions.suffix.addText(textBounds, 'Suffix:', 'right')
    dialog.folderOptions.suffixEdit = dialog.folderOptions.suffix.addEditText(editBounds)
    dialog.folderOptions.suffix.setTooltip('Extra text after file name, can be left empty.')

    dialog.dimension = dialog.main.addVPanel('Dimension')
    dialog.dimensionCheck = dialog.dimension.addCheckBox(undefined, 'Maintain size & position')
    dialog.dimension.setTooltip('Keep current dimension after relinking.')

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