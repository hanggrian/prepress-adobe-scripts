#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]


var dialog = new Dialog('Impose 4-up Simplex', 'right')
var pdfPanel, pagesPanel, documentPanel
var duplexCheck

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

    dialog.main.hgroup(function(mainGroup) {
        mainGroup.alignChildren = 'fill'
        mainGroup.vgroup(function(group) {
            if (files.first().isPDF()) {
                pdfPanel = new OpenPDFPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            }
            pagesPanel = new OpenPagesPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            pagesPanel.pagesEdit.text = '8'
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })
    duplexCheck = dialog.main.checkBox(undefined, 'Duplex Printing', function(it) {
        it.helpTip = 'Is this layout double-sided?'
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = pagesPanel.getPages()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        if (pages < 1 || pages % 8 !== 0) {
            alert('Pages must be higher than 0 and can be divided by 8.')
        } else {
            var document = documentPanel.open('Untitled-4-Up',
                pages / 4,
                (height + bleed * 2) * 2,
                (width + bleed * 2) * 2)
            var pager = duplexCheck.value ? new FourUpDuplexPager(document) : new FourUpSimplexPager(document)
            pager.forEachArtboard(function(artboard, topLeftIndex, topRightIndex, bottomLeftIndex, bottomRightIndex) {
                var topLeftItem = document.placedItems.add()
                var topRightItem = document.placedItems.add()
                var bottomLeftItem = document.placedItems.add()
                var bottomRightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    topLeftItem.setPDFFile(files.first(), topLeftIndex, pdfPanel.getBoxType())
                    topRightItem.setPDFFile(files.first(), topRightIndex, pdfPanel.getBoxType())
                    bottomLeftItem.setPDFFile(files.first(), bottomLeftIndex, pdfPanel.getBoxType())
                    bottomRightItem.setPDFFile(files.first(), bottomRightIndex, pdfPanel.getBoxType())
                } else {
                    topLeftItem.file = files[topLeftIndex]
                    topRightItem.file = files[topRightIndex]
                    bottomLeftItem.file = files[bottomLeftIndex]
                    bottomRightItem.file = files[bottomRightIndex]
                }
                var rect = artboard.artboardRect
                var leftX = rect[0]
                var rightX = leftX + height + bleed * 2
                var topY = rect[1]
                var bottomY = topY - width - bleed * 2
                topLeftItem.width = width + bleed * 2
                topRightItem.width = width + bleed * 2
                bottomLeftItem.width = width + bleed * 2
                bottomRightItem.width = width + bleed * 2
                topLeftItem.height = height + bleed * 2
                topRightItem.height = height + bleed * 2
                bottomLeftItem.height = height + bleed * 2
                bottomRightItem.height = height + bleed * 2
                topLeftItem.rotate(90)
                topRightItem.rotate(90)
                bottomLeftItem.rotate(90)
                bottomRightItem.rotate(90)
                topLeftItem.position = [leftX, topY]
                topRightItem.position = [rightX, topY]
                bottomLeftItem.position = [leftX, bottomY]
                bottomRightItem.position = [rightX, bottomY]
                if (bleed > 0) {
                    var topLeftGuide = document.pathItems.rectangle(
                        topY - bleed,
                        leftX + bleed,
                        height,
                        width)
                    topLeftGuide.filled = false
                    topLeftGuide.guides = true
                    var topRightGuide = document.pathItems.rectangle(
                        topY - bleed,
                        rightX + bleed,
                        height,
                        width)
                    topRightGuide.filled = false
                    topRightGuide.guides = true
                    var bottomLeftGuide = document.pathItems.rectangle(
                        bottomY - bleed,
                        leftX + bleed,
                        height,
                        width)
                    bottomLeftGuide.filled = false
                    bottomLeftGuide.guides = true
                    var bottomRightGuide = document.pathItems.rectangle(
                        bottomY - bleed,
                        rightX + bleed,
                        height,
                        width)
                    bottomRightGuide.filled = false
                    bottomRightGuide.guides = true
                }
            })
        }
    })
    dialog.show()
}