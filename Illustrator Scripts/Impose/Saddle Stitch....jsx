#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Saddle Stitch', 'right')
var pdfPanel, pagesPanel, documentPanel
var rtlCheck

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
        rtlCheck = group.checkBox(undefined, 'Right-to-Left', function(it) {
            it.setTooltip('Useful for Arabic layout')
        })
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var start = pagesPanel.rangeGroup.getStart()
        var end = pagesPanel.rangeGroup.getEnd()
        var pages = pagesPanel.rangeGroup.getLength()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        if (pages % 4 !== 0) {
            errorWithAlert('Pages must be divisible by 4')
        }
        var document = documentPanel.open('Untitled-Saddle Stitch',
            pages / 2,
            width * 2,
            height,
            bleed)
        var pager = new SaddleStitchPager(document, start, end, rtlCheck.value)
        pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {
            var item1 = document.placedItems.add()
            var item2 = document.placedItems.add()
            if (files.first().isPDF()) {
                preferences.setPDFPage(leftIndex)
                item1.file = files.first()
                preferences.setPDFPage(rightIndex)
                item2.file = files.first()
            } else {
                item1.file = files[leftIndex]
                item2.file = files[rightIndex]
            }
            var rect = artboard.artboardRect
            var x1 = rect[0]
            var x2 = x1 + width
            var y = rect[1]
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
    })
    dialog.show()
}