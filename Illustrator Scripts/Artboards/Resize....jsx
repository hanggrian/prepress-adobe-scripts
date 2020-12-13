#target Illustrator
#include '../../.rootlib/core-units.js'
#include '../../.rootlib/sui-validator.js'
#include '../.lib/commons.js'
#include '../.lib/resources.js'

createDialog('Resize Artboards')

dialog.header = dialog.main.addHGroup()
dialog.fitButton = dialog.header.addIconButton(undefined, getResource('wrap_content.png'), function() {
    dialog.close()
    document.artboards.forEach(function(_, i) {
        document.artboards.setActiveArtboardIndex(i)
        document.selectObjectsOnActiveArtboard(i)
        document.fitArtboardToSelectedArt(i)
    })
})

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

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    var w = parseUnit(dialog.widthEdit.text)
    var h = parseUnit(dialog.heightEdit.text)
    if (w <= 0 || h <= 0) {
        return
    }
    document.artboards.forEach(function(it) {
        resizeArtboard(it, w, h)
    })
})
show()

/**
 * Imported from https://github.com/iconifyit/ai-scripts/blob/master/Resize%20All%20Artboards.jsx.
 */
function resizeArtboard(artboard, targetWidth, targetHeight) {
    var bounds = artboard.artboardRect;

    var left = bounds[0]
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