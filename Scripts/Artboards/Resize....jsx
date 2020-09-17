#target Illustrator
#include '../.lib/core-units.js'
#include '../.lib/commons.js'
#include '../.lib/ui-validator.js'

var BOUNDS_TEXT = [0, 0, 45, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]

init('Resize Artboards')

root.w = root.addHGroup()
root.w.add('statictext', BOUNDS_TEXT, 'Width:').justify = 'right'
var widthEdit = root.w.add('edittext', BOUNDS_EDIT)
widthEdit.validateUnits()
widthEdit.active = true

root.h = root.addHGroup()
root.h.add('statictext', BOUNDS_TEXT, 'Height:').justify = 'right'
var heightEdit = root.h.add('edittext', BOUNDS_EDIT)
heightEdit.validateUnits()

addAction('Cancel')
addAction('OK', function() {
    var width = parseUnit(widthEdit.text)
    var height = parseUnit(heightEdit.text)
    if (width <= 0 || height <= 0) {
        return
    }
    document.artboards.forEach(function(it) {
        resizeArtboard(it, width, height)
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