#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Saddle Stitch')
var pdfPanel, pagesPanel, documentPanel
var rtlCheck

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
            rtlCheck = group.checkBox(undefined, 'Right-to-Left').also(function(it) {
                it.tip('Useful for Arabic layout')
            })
        })
    })
    dialog.setCancelButton('Cancel')
    dialog.setOKButton(function() {
        var start = pagesPanel.rangeGroup.getStart()
        var end = pagesPanel.rangeGroup.getEnd()
        var pages = pagesPanel.rangeGroup.getLength()
        var artboards = pages / 2
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()

        if (pages % 4 !== 0) {
            errorWithAlert('Pages must be divisible by 4')
        }
        var document = documentPanel.open('Untitled-Saddle Stitch',
            artboards,
            width * 2,
            height,
            bleed)
        var pager = new SaddleStitchPager(document, start, end, rtlCheck.value)

        var progress = new ProgressDialog(artboards, 'Creating artboards')
        pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {
            progress.increment()
            var item1 = document.placedItems.add()
            var item2 = document.placedItems.add()
            item1.file = collection.get(leftIndex)
            item2.file = collection.get(rightIndex)
            var x1 = artboard.artboardRect.getLeft()
            var x2 = x1 + width
            var y = artboard.artboardRect.getTop()
            Array(item1, item2).forEach(function(it) {
                it.width = width + bleed * 2
                it.height = height + bleed * 2
            })
            item1.position = [x1 - bleed, y + bleed]
            item2.position = [x2 - bleed, y + bleed]
            if (bleed > 0) {
                var group1 = document.groupItems.add()
                item1.moveToBeginning(group1)
                var clip1 = document.pathItems.rectangle(
                    y + bleed,
                    x1 - bleed,
                    width + bleed,
                    height + bleed * 2)
                clip1.clipping = true
                clip1.moveToBeginning(group1)
                group1.clipped = true

                var group2 = document.groupItems.add()
                item2.moveToBeginning(group2)
                var clip2 = document.pathItems.rectangle(
                    y + bleed,
                    x2,
                    width + bleed,
                    height + bleed * 2)
                clip2.clipping = true
                clip2.moveToBeginning(group2)
                group2.clipped = true
            }
        })
        progress.setStatus('Linking files')
    })
    dialog.show()
}