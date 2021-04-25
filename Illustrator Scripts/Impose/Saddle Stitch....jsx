#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [45, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Saddle Stich')
var pdfPanel, documentPanel
var bleedEdit

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

    if (files.first().isPDF()) {
        pdfPanel = new OpenPDFOptionsPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    documentPanel = new OpenDocumentOptionsPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
    documentPanel.main.hgroup(function(group) {
        group.staticText(BOUNDS_TEXT, 'Bleed:', JUSTIFY_RIGHT)
        bleedEdit = group.editText(BOUNDS_EDIT, '0 mm', VALIDATE_UNITS)
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = documentPanel.getPages()
        var width = documentPanel.getWidth()
        var height = documentPanel.getHeight()
        var bleed = parseUnits(bleedEdit.text)
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            var document = documentPanel.impose('Untitled-Saddle Stitch', bleed)
            var pager = new SaddleStitchPager(document, pages, files.first().isPDF())
            pager.forEachArtboard(function(artboard) {
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
                if (bleed <= 0) {
                    leftItem.width = width
                    rightItem.width = width
                    leftItem.height = height
                    rightItem.height = height
                    leftItem.position = [leftX, y]
                    rightItem.position = [rightX, y]
                } else {
                    leftItem.width = width + bleed * 2
                    rightItem.width = width + bleed * 2
                    leftItem.height = height + bleed * 2
                    rightItem.height = height + bleed * 2

                    var leftGroup = document.groupItems.add()
                    leftItem.moveToBeginning(leftGroup)
                    var leftClip = document.pathItems.rectangle(
                        y + bleed,
                        leftX - bleed,
                        width + bleed,
                        height + bleed * 2)
                    leftClip.clipping = true
                    leftClip.moveToBeginning(leftGroup)
                    leftGroup.clipped = true

                    var rightGroup = document.groupItems.add()
                    rightItem.moveToBeginning(rightGroup)
                    var rightClip = document.pathItems.rectangle(
                        y + bleed,
                        rightX,
                        width + bleed,
                        height + bleed * 2)
                    rightClip.clipping = true
                    rightClip.moveToBeginning(rightGroup)
                    rightGroup.clipped = true

                    leftItem.position = [leftX - bleed, y + bleed]
                    rightItem.position = [rightX - bleed, y + bleed]
                }
            })
        }
    })
    dialog.show()
}