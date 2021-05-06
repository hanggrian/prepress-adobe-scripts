#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 8-Up', 'right')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck, duplexCheck

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
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })
    dialog.main.hgroup(function(group) {
        rotateCheck = group.checkBox(undefined, 'Rotate Page')
        duplexCheck = group.checkBox(undefined, 'Duplex Printing', function(it) {
            it.helpTip = 'Is this layout double-sided?'
        })
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var start = pagesPanel.rangeGroup.getStart()
        var pages = pagesPanel.rangeGroup.getLength()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        var rotatedWidth = !rotateCheck.value ? width : height
        var rotatedHeight = !rotateCheck.value ? height : width
        if (pages % 16 !== 0) {
            alert('Pages must be divisible by 16.')
        }
        var document = documentPanel.open('Untitled-8-Up',
            pages / 8,
            (rotatedWidth + bleed * 2) * 4,
            (rotatedHeight + bleed * 2) * 2,
            0)
        var pager = duplexCheck.value
            ? new EightUpDuplexPager(document, start)
            : new EightUpSimplexPager(document, start)
        pager.forEachArtboard(function(artboard,
            top1Index, top2Index, top3Index, top4Index,
            bottom1Index, bottom2Index, bottom3Index, bottom4Index) {
            var topItem1 = document.placedItems.add()
            var topItem2 = document.placedItems.add()
            var topItem3 = document.placedItems.add()
            var topItem4 = document.placedItems.add()
            var bottomItem1 = document.placedItems.add()
            var bottomItem2 = document.placedItems.add()
            var bottomItem3 = document.placedItems.add()
            var bottomItem4 = document.placedItems.add()
            if (files.first().isPDF()) {
                preferences.setPDFPage(top1Index)
                topItem1.file = files.first()
                preferences.setPDFPage(top2Index)
                topItem2.file = files.first()
                preferences.setPDFPage(top3Index)
                topItem3.file = files.first()
                preferences.setPDFPage(top4Index)
                topItem4.file = files.first()
                preferences.setPDFPage(bottom1Index)
                bottomItem1.file = files.first()
                preferences.setPDFPage(bottom2Index)
                bottomItem2.file = files.first()
                preferences.setPDFPage(bottom3Index)
                bottomItem3.file = files.first()
                preferences.setPDFPage(bottom4Index)
                bottomItem4.file = files.first()
            } else {
                topItem1.file = files[top1]
                topItem2.file = files[top2]
                topItem3.file = files[top3]
                topItem4.file = files[top4]
                bottomItem1.file = files[bottom1]
                bottomItem2.file = files[bottom2]
                bottomItem3.file = files[bottom3]
                bottomItem4.file = files[bottom4]
            }
            var rect = artboard.artboardRect
            var x1 = rect[0]
            var x2 = x1 + rotatedWidth + bleed * 2
            var x3 = x2 + rotatedWidth + bleed * 2
            var x4 = x3 + rotatedWidth + bleed * 2
            var y1 = rect[1]
            var y2 = y1 - rotatedHeight - bleed * 2
            Array(topItem1, topItem2, topItem3, topItem4, bottomItem1, bottomItem2, bottomItem3, bottomItem4).forEach(function(it) {
                it.width = width + bleed * 2
                it.height = height + bleed * 2
                if (rotateCheck.value) {
                    it.rotate(duplexCheck.value && document.artboards.indexOf(artboard).isOdd() ? 270 : 90)
                }
            })
            topItem1.position = [x1, y1]
            topItem2.position = [x2, y1]
            topItem3.position = [x3, y1]
            topItem4.position = [x4, y1]
            bottomItem1.position = [x1, y2]
            bottomItem2.position = [x2, y2]
            bottomItem3.position = [x3, y2]
            bottomItem4.position = [x4, y2]
            if (bleed > 0) {
                var topGuide1 = document.pathItems.rectangle(
                    y1 - bleed,
                    x1 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                topGuide1.filled = false
                topGuide1.guides = true
                var topGuide2 = document.pathItems.rectangle(
                    y1 - bleed,
                    x2 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                topGuide2.filled = false
                topGuide2.guides = true
                var topGuide3 = document.pathItems.rectangle(
                    y1 - bleed,
                    x3 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                topGuide3.filled = false
                topGuide3.guides = true
                var topGuide4 = document.pathItems.rectangle(
                    y1 - bleed,
                    x4 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                topGuide4.filled = false
                topGuide4.guides = true
                var bottomGuide1 = document.pathItems.rectangle(
                    y2 - bleed,
                    x1 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                bottomGuide1.filled = false
                bottomGuide1.guides = true
                var bottomGuide2 = document.pathItems.rectangle(
                    y2 - bleed,
                    x2 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                bottomGuide2.filled = false
                bottomGuide2.guides = true
                var bottomGuide3 = document.pathItems.rectangle(
                    y2 - bleed,
                    x3 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                bottomGuide3.filled = false
                bottomGuide3.guides = true
                var bottomGuide4 = document.pathItems.rectangle(
                    y2 - bleed,
                    x4 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                bottomGuide4.filled = false
                bottomGuide4.guides = true
            }
        })
    })
    dialog.show()
}