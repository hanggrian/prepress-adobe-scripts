#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui/open-options.js'

var BOUNDS_TEXT = [75, 21]
var BOUNDS_EDIT = [100, 21]


var dialog = new Dialog('Impose 4-up Simplex')
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
        if (pages === 0 || pages % 8 !== 0) {
            alert('Total pages must be a non-zero number that can be divided by 8.')
        } else {
            var document = app.documents.addDocument(DocumentPresetType.Print, documentGroup.getPreset().let(function(preset) {
                preset.title = 'Untitled-4-up Simplex'
                preset.numArtboards = pages / 4
                preset.width = (height + bleed * 2) * 2
                preset.height = (width + bleed * 2) * 2
                preset.documentBleedOffset = [0, 0, 0, 0]
                return preset
            }))
            var pager = new SimplexPager4(document, files.first().isPDF())
            pager.forEachArtboard(function(artboard) {
                artboard.name = pager.getArtboardTitle()

                var topLeftItem = document.placedItems.add()
                var topRightItem = document.placedItems.add()
                var bottomLeftItem = document.placedItems.add()
                var bottomRightItem = document.placedItems.add()
                if (files.first().isPDF()) {
                    setPDFPage(pager.getTopLeftIndex(), pdfPanel.getBoxType())
                    topLeftItem.file = files.first()
                    setPDFPage(pager.getTopRightIndex(), pdfPanel.getBoxType())
                    topRightItem.file = files.first()
                    setPDFPage(pager.getBottomLeftIndex(), pdfPanel.getBoxType())
                    bottomLeftItem.file = files.first()
                    setPDFPage(pager.getBottomRightIndex(), pdfPanel.getBoxType())
                    bottomRightItem.file = files.first()
                } else {
                    topLeftItem.file = files[pager.getTopLeftIndex()]
                    topRightItem.file = files[pager.getTopRightIndex()]
                    bottomLeftItem.file = files[pager.getBottomLeftIndex()]
                    bottomRightItem.file = files[pager.getBottomRightIndex()]
                }
                var rect = artboard.artboardRect
                var artboardRight = rect[0] + rect[2]
                var artboardBottom = rect[1] + rect[3]
                var leftX = (artboardRight - height) / 2 - height / 2
                var rightX = (artboardRight - height) / 2 + height / 2
                var topY = (artboardBottom + width) / 2 + width / 2 + bleed
                var bottomY = (artboardBottom + width) / 2 - width / 2 - bleed
                topLeftItem.width = width + bleed * 2
                topRightItem.width = width + bleed * 2
                bottomLeftItem.width = width + bleed * 2
                bottomRightItem.width = width + bleed * 2
                topLeftItem.height = height + bleed * 2
                topRightItem.height = height + bleed * 2
                bottomLeftItem.height = height + bleed * 2
                bottomRightItem.height = height + bleed * 2
                topLeftItem.rotate(90)
                topRightItem.rotate(90)
                bottomLeftItem.rotate(90)
                bottomRightItem.rotate(90)
                topLeftItem.position = [leftX - bleed * 2, topY + bleed]
                topRightItem.position = [rightX, topY + bleed]
                bottomLeftItem.position = [leftX - bleed * 2, bottomY + bleed]
                bottomRightItem.position = [rightX, bottomY + bleed]
                if (bleed > 0) {
                    var topLeftGuide = document.pathItems.rectangle(
                        topY,
                        leftX - bleed,
                        height,
                        width)
                    topLeftGuide.filled = false
                    topLeftGuide.guides = true
                    var topRightGuide = document.pathItems.rectangle(
                        topY,
                        rightX + bleed,
                        height,
                        width)
                    topRightGuide.filled = false
                    topRightGuide.guides = true
                    var bottomLeftGuide = document.pathItems.rectangle(
                        bottomY,
                        leftX - bleed,
                        height,
                        width)
                    bottomLeftGuide.filled = false
                    bottomLeftGuide.guides = true
                    var bottomRightGuide = document.pathItems.rectangle(
                        bottomY,
                        rightX + bleed,
                        height,
                        width)
                    bottomRightGuide.filled = false
                    bottomRightGuide.guides = true
                }
            })
        }
    })
    dialog.show()
}