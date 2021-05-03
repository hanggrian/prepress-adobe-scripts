#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose Perfect Bound', 'right')
var pdfPanel, pagesPanel, documentPanel
var rotateCheck

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
            pagesPanel = new OpenPagesPanel(group, BOUNDS_TEXT, BOUNDS_EDIT, '2')
        })
        documentPanel = new OpenDocumentPanel(mainGroup)
    })
    dialog.main.hgroup(function(group) {
        rotateCheck = group.checkBox(undefined, 'Rotate Page')
    })

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = pagesPanel.getPages()
        var width = pagesPanel.getWidth()
        var height = pagesPanel.getHeight()
        var bleed = pagesPanel.getBleed()
        var rotatedWidth = !rotateCheck.value ? width : height
        var rotatedHeight = !rotateCheck.value ? height : width
        if (pages < 1) {
            alert('Pages must be higher than 0.')
        } else {
            var document = documentPanel.open('Untitled-Perfect Bound',
                pages,
                rotatedWidth,
                rotatedHeight,
                bleed)
            var pager = new PerfectBoundPager(document)
            
            preferences.setPDFCrop(pdfPanel.getBoxType())
            pager.forEachArtboard(function(artboard, index) {
                var item = document.placedItems.add()
                if (files.first().isPDF()) {
                    preferences.setPDFPage(index)
                    item.file = files.first()
                } else {
                    item.file = files[pager.getIndex()]
                }
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
        }
    })
    dialog.show()
}