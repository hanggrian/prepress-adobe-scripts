#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var dialog = new Dialog('Impose One Side')
var pdfPanel, documentPanel

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

    var textBounds = [45, 21]
    var editBounds = [100, 21]

    if (files.first().isPDF()) {
        pdfPanel = new OpenPDFOptionsPanel(dialog.main, textBounds, editBounds)
    }
    documentPanel = new OpenDocumentOptionsPanel(dialog.main, textBounds, editBounds)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = documentPanel.getPages()
        var width = documentPanel.getWidth()
        var height = documentPanel.getHeight()
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            var document = documentPanel.impose('Untitled-One Side')
            var pager = new OneSidePager(document, files.first().isPDF())
            pager.forEachArtboard(function(artboard, left, right) {
                artboard.name = pager.getLeftTitle() + '-' + pager.getRightTitle()

                var leftItem = document.placedItems.add()
                var rightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    setPDFPage(pager.getLeftIndex(), pdfPanel.getBoxType())
                    leftItem.file = files.first()
                    setPDFPage(pager.getRightIndex(), pdfPanel.getBoxType())
                    rightItem.file = files.first()
                } else {
                    leftItem.file = files[pager.getLeftIndex()]
                    rightItem.file = files[pager.getRightIndex()]
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
        }
    })
    dialog.show()
}