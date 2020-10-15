#target Illustrator
#include '../.lib/core-units.js'
#include '../.lib/commons.js'
#include '../.lib/ui-validator.js'

var BOUNDS_TEXT = [0, 0, 45, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]

createDialog('Resize Artboards')

var width = dialog.main.addHGroup()
width.add('statictext', BOUNDS_TEXT, 'Width:').justify = 'right'
width.widthEdit = width.add('edittext', BOUNDS_EDIT)
width.widthEdit.validateUnits()
width.widthEdit.active = true

var height = dialog.main.addHGroup()
height.add('statictext', BOUNDS_TEXT, 'Height:').justify = 'right'
height.heightEdit = height.add('edittext', BOUNDS_EDIT)
height.heightEdit.validateUnits()

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    var w = parseUnit(width.widthEdit.text)
    var h = parseUnit(height.heightEdit.text)
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