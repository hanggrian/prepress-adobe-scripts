#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_TEXT = [45, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Artboards')
var widthEdit, heightEdit

dialog.hgroup(function(group) {
    group.setHelpTips("Artboards' new width.")
    group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.hgroup(function(group) {
    group.setHelpTips("Artboards' new height.")
    group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2), VALIDATE_UNITS)
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var w = parseUnits(widthEdit.text)
    var h = parseUnits(heightEdit.text)
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