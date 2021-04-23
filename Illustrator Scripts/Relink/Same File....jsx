#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'
#include '../.lib/ui/open-options.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Same File', 'fill')
var pdfPanel, maintainGroup
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
    var textBounds = [50, 21]
    var editBounds = [100, 21]

    if (file.isPDF()) {
        pdfPanel = new OpenPDFOptionsPanel(dialog.main, textBounds, editBounds)
        pdfPanel.main.hgroup(function(panel) {
            panel.setHelpTips('What page should be used when opening a multipage document.')
            panel.staticText(textBounds, 'Page:', JUSTIFY_RIGHT)
            pageEdit = panel.editText(editBounds, '1', function(it) {
                it.validateDigits()
                it.activate()
            })
        })
    }
    maintainGroup = new MaintainDimensionGroup(dialog.main)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        if (file.isPDF()) {
            var page = parseInt(pageEdit.text) || 1
            setPDFPage(page, pdfPanel.getBoxType())
        }
        items.forEach(function(item) {
            var width = item.width
            var height = item.height
            var position = item.position
            try {
                // code below will throw error if PlacedItem file is missing
                if (item.file.exists && item.file.equalTo(file) && file.isPDF()) {
                    item.file = getResource(R.png.blank)
                }
            } catch (e) {
                $.writeln(e.message)
            }
            item.relink(file)
            if (maintainGroup.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
        })
    })
    dialog.show()
}