#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Perfect Bound', 'right')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck

var files = openFile(dialog.title, [
    FILTERS_ADOBE_ILLUSTRATOR, FILTERS_ADOBE_PDF,
    FILTERS_BMP, FILTERS_GIF89a, FILTERS_JPEG, FILTERS_JPEG2000, FILTERS_PNG, FILTERS_PHOTOSHOP, FILTERS_TIFF
], true)

if (files !== null && files.isNotEmpty()) {
    var collection = new FileCollection(files)

    dialog.main.hgroup(function(topGroup) {
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
            })
        })
        documentPanel = new OpenDocumentPanel(topGroup)
    })
    dialog.main.hgroup(function(group) {
        rotateCheck = group.checkBox(undefined, 'Rotate Page', function(it) {
            it.setTooltip('Should the page be rotated?')
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

        var document = documentPanel.open('Untitled-Perfect Bound',
            pages,
            rotatedWidth,
            rotatedHeight,
            bleed)
        var pager = new PerfectBoundPager(document, start)
        pager.forEachArtboard(function(artboard, index) {
            var item = document.placedItems.add()
            item.file = collection.get(index)
            var x = artboard.artboardRect.getLeft()
            var y = artboard.artboardRect.getTop()
            item.width = width + bleed * 2
            item.height = height + bleed * 2
            if (rotateCheck.value) {
                item.rotate(90)
            }
            item.position = [x - bleed, y + bleed]
        })
    })
    dialog.show()
}