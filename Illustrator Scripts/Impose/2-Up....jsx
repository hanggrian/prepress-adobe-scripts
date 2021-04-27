#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-Up', 'right')
var pdfPanel, pagesPanel, documentPanel
var duplexCheck

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
    duplexCheck = dialog.main.checkBox(undefined, 'Duplex Printing', function(it) {
        it.helpTip = 'Is this layout double-sided?'
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = pagesPanel.getPages()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        if (pages < 1 || pages % 4 !== 0) {
            alert('Pages must be higher than 0 and can be divided by 4.')
        } else {
            var document = documentPanel.open('Untitled-2-Up',
                pages / 2,
                (width + bleed * 2) * 2,
                (height + bleed * 2))
            var pager = duplexCheck.value ? new TwoUpDuplexPager(document) : new TwoUpSimplexPager(document)
            pager.forEachArtboard(function(artboard, leftIndex, rightIndex) {                
                var leftItem = document.placedItems.add()
                var rightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    leftItem.setPDFFile(files.first(), leftIndex, pdfPanel.getBoxType())
                    rightItem.setPDFFile(files.first(), rightIndex, pdfPanel.getBoxType())
                } else {
                    leftItem.file = files[leftIndex]
                    rightItem.file = files[rightIndex]
                }
                var rect = artboard.artboardRect
                var leftX = rect[0]
                var rightX = leftX + width + bleed * 2
                var y = rect[1]
                leftItem.width = width + bleed * 2
                rightItem.width = width + bleed * 2
                leftItem.height = height + bleed * 2
                rightItem.height = height + bleed * 2
                leftItem.position = [leftX, y]
                rightItem.position = [rightX, y]
                if (bleed > 0) {
                    var leftGuide = document.pathItems.rectangle(
                        y - bleed,
                        leftX + bleed,
                        width,
                        height)
                    leftGuide.filled = false
                    leftGuide.guides = true
                    var rightGuide = document.pathItems.rectangle(
                        y - bleed,
                        rightX + bleed,
                        width,
                        height)
                    rightGuide.filled = false
                    rightGuide.guides = true
                }
            })
        }
    })
    dialog.show()
}