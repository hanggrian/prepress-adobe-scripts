#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [65, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-Up')
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
            pagesPanel.main.hgroup(function(group) {
                group.setHelpTips('Is this layout double-sided?')
                group.staticText(BOUNDS_TEXT, 'Duplexing:', JUSTIFY_RIGHT)
                duplexCheck = group.checkBox(BOUNDS_EDIT, 'Enable')
            })
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = pagesPanel.getPages()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            var document = documentPanel.open('Untitled-2-Up',
                pages / 2,
                (width + bleed * 2) * 2,
                (height + bleed * 2))
            var pager = duplexCheck.value
                ? new DuplexPager2(document, files.first().isPDF())
                : new SimplexPager2(document, files.first().isPDF())
            pager.forEachArtboard(function(artboard) {
                artboard.name = pager.getArtboardTitle()
                
                var leftItem = document.placedItems.add()
                var rightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    setPDFPage(pager.getLeftIndex(), pdfPanel.getBoxType())
                    leftItem.file = files.first()
                    setPDFPage(pager.getRightIndex(), pdfPanel.getBoxType())
                    rightItem.file = files.first()
                } else {
                    leftItem.file = files[pager.getLeftIndex()]
                    rightItem.file = files[pager.getRightIndex()]
                }
                var rect = artboard.artboardRect
                var artboardRight = rect[0] + rect[2]
                var artboardBottom = rect[1] + rect[3]
                var leftX = (artboardRight - width) / 2 - width / 2
                var rightX = (artboardRight - width) / 2 + width / 2
                var y = (artboardBottom + height) / 2
                leftItem.width = width + bleed * 2
                rightItem.width = width + bleed * 2
                leftItem.height = height + bleed * 2
                rightItem.height = height + bleed * 2
                leftItem.position = [leftX - bleed * 2, y + bleed]
                rightItem.position = [rightX, y + bleed]
                if (bleed > 0) {
                    var leftGuide = document.pathItems.rectangle(
                        y,
                        leftX - bleed,
                        width,
                        height)
                    leftGuide.filled = false
                    leftGuide.guides = true
                    var rightGuide = document.pathItems.rectangle(
                        y,
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