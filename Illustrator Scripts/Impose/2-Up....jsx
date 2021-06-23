#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-Up', 'right')
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

    dialog.main.hgroup(function(topGroup) {
        topGroup.alignChildren = 'fill'
        topGroup.vgroup(function(group) {
            if (collection.hasPDF) {
                pdfPanel = new OpenPDFPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            }
            pagesPanel = new OpenPagesPanel(group, BOUNDS_TEXT, BOUNDS_EDIT)
            pagesPanel.rangeGroup.endEdit.text = collection.length
            if (!collection.isSinglePDF) {
                pagesPanel.rangeGroup.maxRange = collection.length
            }
        })
        documentPanel = new OpenDocumentPanel(topGroup)
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

        var pagesDivisor = !duplexCheck.value ? 2 : 4
        if (pages % pagesDivisor !== 0) {
            errorWithAlert('Pages must be divisible by ' + pagesDivisor)
        }

        var document = documentPanel.open('Untitled-2-Up',
            pages / 2,
            (rotatedWidth + bleed * 2) * 2,
            (rotatedHeight + bleed * 2),
            0)
        var pager = duplexCheck.value
            ? new TwoUpDuplexPager(document, start)
            : new TwoUpSimplexPager(document, start)
        pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {
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