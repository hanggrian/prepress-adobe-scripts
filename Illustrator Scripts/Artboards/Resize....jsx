#target Illustrator
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Artboards')
var rangeGroup, widthEdit, heightEdit, anchorGroup
var isFitArtsMode = false

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

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var w = parseUnits(widthEdit.text)
    var h = parseUnits(heightEdit.text)
    if (w > 0 && h > 0) {
        rangeGroup.forEach(function(i) {
            if (isFitArtsMode) {
                document.artboards.setActiveArtboardIndex(i)
                document.selectObjectsOnActiveArtboard(i)
                document.fitArtboardToSelectedArt(i)
            } else {
                resizeArtboard(document.artboards[i], w, h)
            }
        })
    }
})
dialog.setNeutralButton(20, 'Fit Arts Mode', function() {
    isFitArtsMode = !isFitArtsMode
    dialog.setTitle(isFitArtsMode ? 'Resize Artboards (Fit Arts)' : 'Resize Artboards')
    dialog.neutralButton.text = isFitArtsMode ? 'Default Mode' : 'Fit Arts Mode'
    widthEdit.enabled = !isFitArtsMode
    heightEdit.enabled = !isFitArtsMode
    anchorGroup.main.enabled = !isFitArtsMode
    return true
})
dialog.show()

// Customized from https://github.com/iconifyit/ai-scripts/blob/master/Resize%20All%20Artboards.jsx.
function resizeArtboard(artboard, w, h) {
    var bounds = artboard.artboardRect

    var ctrx, ctry
    if (anchorGroup.isVerticalLeft()) {
        ctrx = bounds.getLeft()
    } else if (anchorGroup.isVerticalCenter()) {
        ctrx = bounds.getWidth() / 2 + bounds.getLeft()
    } else {
        ctrx = bounds.getWidth() + bounds.getLeft()
    }
    if (anchorGroup.isHorizontalTop()) {
        ctry = bounds.getTop()
    } else if (anchorGroup.isHorizontalCenter()) {
        ctry = bounds.getTop() - bounds.getHeight() / 2
    } else {
        ctry = bounds.getTop() - bounds.getHeight()
    }

    var newLeft, newTop, newRight, newBottom
    if (anchorGroup.isVerticalLeft()) {
        newLeft = bounds.getLeft()
        newRight = ctrx + w
    } else if (anchorGroup.isVerticalCenter()) {
        newLeft = ctrx - w / 2
        newRight  = ctrx + w / 2
    } else {
        newLeft = ctrx - w
        newRight = bounds.getRight()
    }
    if (anchorGroup.isHorizontalTop()) {
        newTop = bounds.getTop()
        newBottom = ctry - h
    } else if (anchorGroup.isHorizontalCenter()) {
        newTop = ctry + h / 2
        newBottom = ctry - h / 2
    } else {
        newTop = ctry + h
        newBottom = bounds.getBottom()
    }
    artboard.artboardRect = [newLeft, newTop, newRight, newBottom]
}