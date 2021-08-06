#target Illustrator
#include '../.lib/core.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Perfect Bound')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck

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
        })
    })
    dialog.setCancelButton('Cancel')
    dialog.setOKButton(function() {
        var start = pagesPanel.rangeGroup.getStart()
        var pages = pagesPanel.rangeGroup.getLength()
        var artboards = pages
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        var rotatedWidth = !rotateCheck.value ? width : height
        var rotatedHeight = !rotateCheck.value ? height : width

        var document = documentPanel.open('Untitled-Perfect Bound',
            artboards,
            rotatedWidth,
            rotatedHeight,
            bleed)
        var pager = new PerfectBoundPager(document, start)

        var progress = new ProgressDialog(artboards, 'Creating artboards')
        pager.forEachArtboard(function(artboard, index) {
            progress.increment()
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
        progress.setStatus('Linking files')
    })
    dialog.show()
}