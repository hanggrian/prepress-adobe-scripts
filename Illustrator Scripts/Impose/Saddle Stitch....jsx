#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

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
            pagesPanel.pagesEdit.text = '4'
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })
    rtlCheck = dialog.main.checkBox(undefined, 'Right-to-Left', function(it) {
        it.helpTip = 'Useful for Arabic layout.'
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
            var document = documentPanel.open('Untitled-Saddle Stitch',
                pages / 2,
                width * 2,
                height,
                bleed)
            var pager = new SaddleStitchPager(document, pages, rtlCheck.value)
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
                var rightX = leftX + width
                var y = rect[1]
                leftItem.width = width + bleed * 2
                rightItem.width = width + bleed * 2
                leftItem.height = height + bleed * 2
                rightItem.height = height + bleed * 2
                leftItem.position = [leftX - bleed, y + bleed]
                rightItem.position = [rightX - bleed, y + bleed]
                if (bleed > 0) {
                    var leftGroup = document.groupItems.add()
                    leftItem.moveToBeginning(leftGroup)
                    var leftClip = document.pathItems.rectangle(
                        y + bleed,
                        leftX - bleed,
                        width + bleed,
                        height + bleed * 2)
                    leftClip.clipping = true
                    leftClip.moveToBeginning(leftGroup)
                    leftGroup.clipped = true

                    var rightGroup = document.groupItems.add()
                    rightItem.moveToBeginning(rightGroup)
                    var rightClip = document.pathItems.rectangle(
                        y + bleed,
                        rightX,
                        width + bleed,
                        height + bleed * 2)
                    rightClip.clipping = true
                    rightClip.moveToBeginning(rightGroup)
                    rightGroup.clipped = true
                }
            })
        }
    })
    dialog.show()
}