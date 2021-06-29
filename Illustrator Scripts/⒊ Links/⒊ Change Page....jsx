#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/maintain-size.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) {
    return it.typename === 'PlacedItem' && it.isFileExists() && it.file.isPDF()
})
check(items.isNotEmpty(), 'No PDF links found in selection')

var dialog = new Dialog('Change Page')
var pdfPanel, maintainSizeGroup

pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
pdfPanel.main.hgroup(function(panel) {
    panel.setTooltips('What page should be used when opening a multipage document')
    panel.staticText(BOUNDS_TEXT, 'Page:', JUSTIFY_RIGHT)
    pageEdit = panel.editText(BOUNDS_EDIT, '1', function(it) {
        it.validateDigits()
        it.activate()
    })
})
maintainSizeGroup = new MaintainSizeGroup(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    preferences.setPDFPage(parseInt(pageEdit.text) - 1)
    items.forEach(function(item, i) {
        $.write(i + '. ')
        var width = item.width
        var height = item.height
        var position = item.position
        var file = item.file
        item.file = getResource(R.png.blank) // Apply PDF fix
        item.file = file
        if (maintainSizeGroup.isSelected()) {
            item.width = width
            item.height = height
            item.position = position
        }
    })
    selection = items
})
dialog.show()