#target Illustrator
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Artboards')
var rangeGroup, widthEdit, heightEdit, anchorGroup, fitToArtCheck

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Artboard', function(panel) {
        rangeGroup = new RangeGroup(panel, BOUNDS_TEXT, BOUNDS_EDIT)
        rangeGroup.maxRange = document.artboards.length
        rangeGroup.endEdit.text = document.artboards.length
        panel.hgroup(function(group) {
            group.setTooltips("Artboards' new width")
            group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2), function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips("Artboards' new height")
            group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2), VALIDATE_UNITS)
        })
    })
    topGroup.vpanel('Anchor', function(panel) {
        anchorGroup = new AnchorGroup(panel)
    })
})
dialog.hgroup(function(group) {
    group.alignment = 'right'
    group.setTooltips('Wrap content to arts in current arboard')
    fitToArtCheck = group.checkBox(undefined, 'Fit to arts', function(it) {
        it.onClick = function() {
            widthEdit.enabled = !it.value
            heightEdit.enabled = !it.value
            anchorGroup.main.enabled = !it.value
        }
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var w = parseUnits(widthEdit.text)
    var h = parseUnits(heightEdit.text)
    if (w > 0 && h > 0) {
        rangeGroup.forEach(function(i) {
            if (fitToArtCheck.value) {
                document.artboards.setActiveArtboardIndex(i)
                document.selectObjectsOnActiveArtboard(i)
                document.fitArtboardToSelectedArt(i)
            } else {
                resizeArtboard(document.artboards[i], w, h)
            }
        })
    }
})
dialog.show()

// Customized from https://github.com/iconifyit/ai-scripts/blob/master/Resize%20All%20Artboards.jsx.
function resizeArtboard(artboard, w, h) {
    var bounds = artboard.artboardRect

    var left = bounds.first()
    var top = bounds[1]
    var right = bounds[2]
    var bottom = bounds[3]

    var width = right - left
    var height = top - bottom

    var ctrx, ctry
    if (anchorGroup.isVerticalLeft()) {
        ctrx = left
    } else if (anchorGroup.isVerticalCenter()) {
        ctrx = width / 2 + left
    } else {
        ctrx = width + left
    }
    if (anchorGroup.isHorizontalTop()) {
        ctry = top
    } else if (anchorGroup.isHorizontalCenter()) {
        ctry = top - height / 2
    } else {
        ctry = top - height
    }

    var newLeft, newTop, newRight, newBottom
    if (anchorGroup.isVerticalLeft()) {
        newLeft = left
        newRight  = ctrx + w
    } else if (anchorGroup.isVerticalCenter()) {
        newLeft = ctrx - w / 2
        newRight  = ctrx + w / 2
    } else {
        newLeft = ctrx - w
        newRight  = right
    }
    if (anchorGroup.isHorizontalTop()) {
        newTop = top
        newBottom = ctry - h
    } else if (anchorGroup.isHorizontalCenter()) {
        newTop = ctry + h / 2
        newBottom = ctry - h / 2
    } else {
        newTop = ctry + h
        newBottom = bottom
    }
    artboard.artboardRect = [newLeft, newTop, newRight, newBottom]
}