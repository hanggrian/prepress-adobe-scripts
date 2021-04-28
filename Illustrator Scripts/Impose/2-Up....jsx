#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-Up', 'right')
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
            pagesPanel.pagesEdit.text = '4'
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
        var pages = pagesPanel.getPages()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        var rotatedWidth = !rotateCheck.value ? width : height
        var rotatedHeight = !rotateCheck.value ? height : width
        if (pages < 1 || pages % 4 !== 0) {
            alert('Pages must be higher than 0 and can be divided by 4.')
        } else {
            var document = documentPanel.open('Untitled-2-Up',
                pages / 2,
                (rotatedWidth + bleed * 2) * 2,
                (rotatedHeight + bleed * 2),
                0)
            var pager = duplexCheck.value ? new TwoUpDuplexPager(document) : new TwoUpSimplexPager(document)
            pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {                
                var item1 = document.placedItems.add()
                var item2 = document.placedItems.add()
                if (files.first().isPDF()) {
                    item1.setPDFFile(files.first(), leftIndex, pdfPanel.getBoxType())
                    item2.setPDFFile(files.first(), rightIndex, pdfPanel.getBoxType())
                } else {
                    item1.file = files[leftIndex]
                    item2.file = files[rightIndex]
                }
                var rect = artboard.artboardRect
                var x1 = rect[0]
                var x2 = x1 + rotatedWidth + bleed * 2
                var y = rect[1]
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
        }
    })
    dialog.show()
}