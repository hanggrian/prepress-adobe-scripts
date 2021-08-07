#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-Up')
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
                it.tip('Should the page be rotated?')
            })
            duplexCheck = group.checkBox(undefined, 'Duplex Printing').also(function(it) {
                it.tip('Is this layout double-sided?')
            })
        })
    })
    dialog.setCancelButton('Cancel')
    dialog.setOKButton(function() {
        var start = pagesPanel.rangeGroup.getStart()
        var pages = pagesPanel.rangeGroup.getLength()
        var artboards = pages / 2
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        var rotatedWidth = !rotateCheck.value ? width : height
        var rotatedHeight = !rotateCheck.value ? height : width

        var pagesDivisor = !duplexCheck.value ? 2 : 4
        if (pages % pagesDivisor !== 0) {
            errorWithAlert('Pages must be divisible by ' + pagesDivisor)
        }
        var document = documentPanel.open('Untitled-2-Up',
            artboards,
            (rotatedWidth + bleed * 2) * 2,
            (rotatedHeight + bleed * 2),
            0)
        var pager = duplexCheck.value
            ? new TwoUpDuplexPager(document, start)
            : new TwoUpSimplexPager(document, start)

        var progress = new ProgressDialog(artboards)
        pager.forEachArtboard(function(artboard,
            leftIndex, rightIndex) {
            progress.increment('Imposing page {0} to {1}', leftIndex, rightIndex)
            var item1 = document.placedItems.add()
            var item2 = document.placedItems.add()
            item1.file = collection.get(leftIndex)
            item2.file = collection.get(rightIndex)
            var x1 = artboard.artboardRect.getLeft()
            var x2 = x1 + rotatedWidth + bleed * 2
            var y = artboard.artboardRect.getTop()
            Array(item1, item2).forEach(function(it) {
                it.width = width + bleed * 2
                it.height = height + bleed * 2
                if (rotateCheck.value) {
                    it.rotate(duplexCheck.value && document.artboards.indexOf(artboard).isOdd() ? 270 : 90)
                }
            })
            item1.position = [x1, y]
            item2.position = [x2, y]
            if (bleed > 0) {
                var guide1 = document.pathItems.rectangle(
                    y - bleed,
                    x1 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                guide1.filled = false
                guide1.guides = true
                var guide2 = document.pathItems.rectangle(
                    y - bleed,
                    x2 + bleed,
                    rotatedWidth,
                    rotatedHeight)
                guide2.filled = false
                guide2.guides = true
            }
        })
    })
    dialog.show()
}