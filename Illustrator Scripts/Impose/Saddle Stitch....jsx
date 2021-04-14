#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/impose.js'
#include '../.lib/ui/relink.js'

var dialog = new Dialog('Impose Saddle Stich')
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
        dialog.pdf = new RelinkPDFPanel(dialog.main, textBounds, editBounds)
    }

    dialog.impose = new ImposePanel(dialog.main, textBounds, editBounds)
    dialog.impose.bleed = dialog.impose.main.addHGroup()
    dialog.impose.bleed.addText(textBounds, 'Bleed:', 'right')
    dialog.impose.bleedEdit = dialog.impose.bleed.addEditText(editBounds, '0 mm')
    dialog.impose.bleedEdit.validateUnits()

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = dialog.impose.getPages()
        var width = dialog.impose.getWidth()
        var height = dialog.impose.getHeight()
        var bleed = parseUnit(dialog.impose.bleedEdit.text)
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            document = app.documents.addDocument(DocumentPresetType.Print, dialog.impose.getDocumentPreset('Untitled-Saddle Stitch', bleed))
            var pager
            if (files.first().isPDF()) {
                pager = new SaddleStitchPager(document, 1, pages)
            } else {
                pager = new SaddleStitchPager(document, 0, pages - 1)
            }
            pager.forEachArtboard(function(artboard, left, right) {
                var leftItem = document.placedItems.add()
                var rightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    updatePDFPreferences(dialog.pdf.getBoxType(), left)
                    leftItem.file = files.first()
                    updatePDFPreferences(dialog.pdf.getBoxType(), right)
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
                    var leftClip = document.pathItems.rectangle(y + bleed, leftX - bleed, width + bleed, height)
                    leftClip.clipping = true
                    leftClip.moveToBeginning(leftGroup)
                    leftGroup.clipped = true

                    var rightGroup = document.groupItems.add()
                    rightItem.moveToBeginning(rightGroup)
                    var rightClip = document.pathItems.rectangle(y + bleed, rightX, width + bleed, height)
                    rightClip.clipping = true
                    rightClip.moveToBeginning(rightGroup)
                    rightGroup.clipped = true

                    leftItem.position = [leftX - bleed, y + bleed]
                    rightItem.position = [rightX - bleed, y + bleed]
                }
            })
            new SaddleStitchPager(document).bindArtboardName()
        }
    })
    dialog.show()
}