#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 4-Up', 'right')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck, duplexCheck

var files = openFile(dialog.title, [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf'],
    ['BMP', 'bmp'],
    ['GIF89a', 'gif'],
    ['JPEG', 'jpg', 'jpe', 'jpeg'],
    ['JPEG2000', 'jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc'],
    ['PNG', 'png', 'pns'],
    ['Photoshop', 'psd', 'psb', 'pdd'],
    ['TIFF', 'tif', 'tiff']
], true)

if (files !== null && files.isNotEmpty()) {
    var collection = new FileCollection(files)

    dialog.main.hgroup(function(mainGroup) {
        mainGroup.alignChildren = 'fill'
        mainGroup.vgroup(function(group) {
            if (collection.hasPDF) {
                pdfPanel = new OpenPDFPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            }
            pagesPanel = new OpenPagesPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            pagesPanel.rangeGroup.endEdit.text = collection.length.toString()
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })
    dialog.main.hgroup(function(group) {
        rotateCheck = group.checkBox(undefined, 'Rotate Page', function(it) {
            it.setTooltip('Should the page be rotated?')
        })
        duplexCheck = group.checkBox(undefined, 'Duplex Printing', function(it) {
            it.setTooltip('Is this layout double-sided?')
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

        var pagesDivisor = !duplexCheck.value ? 4 : 8
        if (pages % pagesDivisor !== 0) {
            errorWithAlert('Pages must be divisible by ' + pagesDivisor)
        }

        var document = documentPanel.open('Untitled-4-Up',
            pages / 4,
            (rotatedWidth + bleed * 2) * 2,
            (rotatedHeight + bleed * 2) * 2,
            0)
        var pager = duplexCheck.value
            ? new FourUpDuplexPager(document, start)
            : new FourUpSimplexPager(document, start)
        pager.forEachArtboard(function(artboard,
            topLeftIndex, topRightIndex,
            bottomLeftIndex, bottomRightIndex) {
            var topItem1 = document.placedItems.add()
            var topItem2 = document.placedItems.add()
            var bottomItem1 = document.placedItems.add()
            var bottomItem2 = document.placedItems.add()
            topItem1.file = collection.get(topLeftIndex)
            topItem2.file = collection.get(topRightIndex)
            bottomItem1.file = collection.get(bottomLeftIndex)
            bottomItem2.file = collection.get(bottomRightIndex)
            var rect = artboard.artboardRect
            var x1 = rect[0]
            var x2 = x1 + rotatedWidth + bleed * 2
            var y1 = rect[1]
            var y2 = y1 - rotatedHeight - bleed * 2
            Array(topItem1, topItem2, bottomItem1, bottomItem2).forEach(function(it) {
                it.width = width + bleed * 2
                it.height = height + bleed * 2
                if (rotateCheck.value) {
                    it.rotate(duplexCheck.value && document.artboards.indexOf(artboard).isOdd() ? 270 : 90)
                }
            })
            topItem1.position = [x1, y1]
            topItem2.position = [x2, y1]
            bottomItem1.position = [x1, y2]
            bottomItem2.position = [x2, y2]
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
            }
        })
    })
    dialog.show()
}