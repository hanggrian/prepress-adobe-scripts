#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [75, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Impose 2-up Duplex')
var pdfPanel, documentGroup

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
    if (files.first().isPDF()) {
        pdfPanel = new OpenPDFPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
    }
    documentGroup = new OpenDocumentGroup(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)

    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        var pages = documentGroup.getPages()
        var width = documentGroup.getPageWidth()
        var height = documentGroup.getPageHeight()
        var bleed = documentGroup.getPageBleed()
        if (pages === 0 || pages % 4 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 4.')
        } else {
            var document = app.documents.addDocument(DocumentPresetType.Print, documentGroup.getPreset().let(function(preset) {
                preset.title = 'Untitled-2-up Duplex'
                preset.numArtboards = pages / 2
                preset.width = (width + bleed * 2) * 2
                preset.height = height + bleed * 2
                preset.documentBleedOffset = [0, 0, 0, 0]
                return preset
            }))
            var pager = new DuplexPager2(document, files.first().isPDF())
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