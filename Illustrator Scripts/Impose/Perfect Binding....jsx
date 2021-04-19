#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/impose.js'
#include '../.lib/ui/relink.js'

var dialog = new Dialog('Impose Two-Sided Perfect Bound')
var pdfPanel, imposePanel

var files = openFile(dialog.title, [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf'],
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
    }

    var textBounds = [0, 0, 45, 21]
    var editBounds = [0, 0, 100, 21]

    if (files.first().isPDF()) {
        pdfPanel = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
    }

    imposePanel = new ImposePanel(dialog.main, textBounds, editBounds)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = imposePanel.getPages()
        var width = imposePanel.getWidth()
        var height = imposePanel.getHeight()
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            var document = app.documents.addDocument(DocumentPresetType.Print, imposePanel.getDocumentPreset('Untitled-Perfect Binding'))
            var pager
            if (files.first().isPDF()) {
                pager = new PerfectBindingPager(document, 1)
            } else {
                pager = new PerfectBindingPager(document, 0)
            }
            pager.forEachArtboard(function(artboard, left, right) {
                var leftItem = document.placedItems.add()
                var rightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    updatePDFPreferences(pdfPanel.getBoxType(), left)
                    leftItem.file = files.first()
                    updatePDFPreferences(pdfPanel.getBoxType(), right)
                    rightItem.file = files.first()
                } else {
                    leftItem.file = files[left]
                    rightItem.file = files[right]
                }
                var rect = artboard.artboardRect
                var artboardRight = rect[0] + rect[2]
                var artboardBottom = rect[1] + rect[3]
                var leftX = (artboardRight - width) / 2 - width / 2
                var rightX = (artboardRight - width) / 2 + width / 2
                var y = (artboardBottom + height) / 2
                leftItem.width = width
                rightItem.width = width
                leftItem.height = height
                rightItem.height = height
                leftItem.position = [leftX, y]
                rightItem.position = [rightX, y]
            })
            new PerfectBindingPager(document).bindArtboardName()
        }
    })
    dialog.show()
}