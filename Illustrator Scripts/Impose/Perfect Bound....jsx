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
            var rect = artboard.artboardRect
            var x = rect[0]
            var y = rect[1]
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