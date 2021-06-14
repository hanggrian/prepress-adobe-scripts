#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [45, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Artboards')
var rangeGroup, widthEdit, heightEdit, fitToArtCheck

rangeGroup = new RangeGroup(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
rangeGroup.maxRange = document.artboards.length
rangeGroup.endEdit.text = document.artboards.length
dialog.hgroup(function(group) {
    group.setTooltips("Artboards' new width")
    group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.hgroup(function(group) {
    group.setTooltips("Artboards' new height")
    group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2), VALIDATE_UNITS)
})
dialog.hgroup(function(group) {
    group.alignment = 'right'
    group.setTooltips('Wrap content to arts in current arboard')
    fitToArtCheck = group.checkBox(undefined, 'Fit to arts', function(it) {
        it.onClick = function() {
            widthEdit.enabled = !it.value
            heightEdit.enabled = !it.value
        }
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var w = parseUnits(widthEdit.text)
    var h = parseUnits(heightEdit.text)
    if (w <= 0 || h <= 0) {
        return
    }
    var resizeArtboard = fitToArtCheck.value
        ? function(_, i) {
            document.artboards.setActiveArtboardIndex(i)
            document.selectObjectsOnActiveArtboard(i)
            document.fitArtboardToSelectedArt(i)
        }
        // see https://github.com/iconifyit/ai-scripts/blob/master/Resize%20All%20Artboards.jsx.
        : function(artboard, _) {
            var bounds = artboard.artboardRect;
            var left = bounds.first()
            var top = bounds[1]
            var width = bounds[2] - left
            var height = top - bounds[3]
            var ctrx   = width / 2 + left
            var ctry   = top - height / 2
            left = ctrx - w  / 2
            top = ctry + h / 2
            var right  = ctrx + w  / 2
            var bottom = ctry - h / 2
            artboard.artboardRect = [left, top, right, bottom]
        }
    rangeGroup.forEach(function(i) {
        resizeArtboard(document.artboards[i], i)
    })
})
dialog.show()