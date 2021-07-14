#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 4-Up')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck, duplexCheck

var files = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && files.isNotEmpty()) {
    var collection = new FileCollection(files)

    dialog.vgroup(function(main) {
        main.alignChildren = 'right'
        main.hgroup(function(topGroup) {
            topGroup.alignChildren = 'fill'
            topGroup.vgroup(function(group) {
                if (collection.hasPDF) {
                    pdfPanel = new OpenPDFPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
                }
                pagesPanel = new OpenPagesPanel(group, BOUNDS_TEXT, BOUNDS_EDIT).also(function(panel) {
                    panel.rangeGroup.endEdit.text = collection.length
                    if (!collection.isSinglePDF) {
                        panel.rangeGroup.maxRange = collection.length
                    }
                    panel.rangeGroup.startEdit.activate()
                })
            })
            documentPanel = new OpenDocumentPanel(topGroup)
        })
        main.hgroup(function(group) {
            rotateCheck = group.checkBox(undefined, 'Rotate Page').also(function(it) {
                it.setTooltip('Should the page be rotated?')
            })
            duplexCheck = group.checkBox(undefined, 'Duplex Printing').also(function(it) {
                it.setTooltip('Is this layout double-sided?')
            })
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
            var x1 = artboard.artboardRect.getLeft()
            var x2 = x1 + rotatedWidth + bleed * 2
            var y1 = artboard.artboardRect.getTop()
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