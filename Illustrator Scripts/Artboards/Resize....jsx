#target Illustrator
#include '../../.rootlib/sui.js'
#include '../.lib/commons.js'

var dialog = new Dialog('Resize Artboards')

dialog.header = dialog.main.addHGroup()
dialog.fitButton = dialog.header.addIconButton(undefined, getResource('wrap_content.png'), function() {
    dialog.close()
    document.artboards.forEach(function(_, i) {
        document.artboards.setActiveArtboardIndex(i)
        document.selectObjectsOnActiveArtboard(i)
        document.fitArtboardToSelectedArt(i)
    })
})
dialog.fitButton.helpTip = 'Wrap content.'

var textBounds = [0, 0, 45, 21]
var editBounds = [0, 0, 100, 21]

dialog.width2 = dialog.main.addHGroup()
dialog.width2.addText(textBounds, 'Width:', 'right')
dialog.widthEdit = dialog.width2.addEditText(editBounds)
dialog.widthEdit.validateUnits()
dialog.widthEdit.active = true

dialog.height2 = dialog.main.addHGroup()
dialog.height2.addText(textBounds, 'Height:', 'right')
dialog.heightEdit = dialog.height2.addEditText(editBounds)
dialog.heightEdit.validateUnits()

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var w = parseUnit(dialog.widthEdit.text)
    var h = parseUnit(dialog.heightEdit.text)
    if (w <= 0 || h <= 0) {
        return
    }
    document.artboards.forEach(function(it) {
        resizeArtboard(it, w, h)
    })
})
dialog.show()

/**
 * Imported from https://github.com/iconifyit/ai-scripts/blob/master/Resize%20All%20Artboards.jsx.
 */
function resizeArtboard(artboard, targetWidth, targetHeight) {
    var bounds = artboard.artboardRect;

    var left = bounds.first()
    var top = bounds[1]
    var width = bounds[2] - left
    var height = top - bounds[3]

    var ctrx   = width / 2 + left
    var ctry   = top - height / 2

    left = ctrx - targetWidth  / 2
    top = ctry + targetHeight / 2
    var right  = ctrx + targetWidth  / 2
    var bottom = ctry - targetHeight / 2

    artboard.artboardRect = [left, top, right, bottom]
}