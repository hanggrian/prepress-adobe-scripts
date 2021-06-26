#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var ANCHORS = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right']

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]
var BOUNDS_RADIO = [15, 15]

checkHasSelection()

check(document.artboards.length > 1, 'No other artboards')
var activeArtboardIndex = document.artboards.getActiveArtboardIndex()
var activeArtboard = document.artboards[activeArtboardIndex]
var activeArtboardRect = activeArtboard.artboardRect

selection.forEach(function(it) {
    check(it.geometricBounds.isWithin(activeArtboardRect), 'Selected item is out of active artboard')
})

var relativePositions = selection.map(function(it) {
    var bounds = it.geometricBounds
    var relativeLeft = bounds.getLeft() - activeArtboardRect.getLeft()
    var relativeRight = activeArtboardRect.getRight() - bounds.getRight() + bounds.getWidth()
    var relativeTop = bounds.getTop() - activeArtboardRect.getTop()
    var relativeBottom = activeArtboardRect.getBottom() - bounds.getBottom() - bounds.getHeight()
    return [relativeLeft, relativeTop, relativeRight, relativeBottom]
})

var dialog = new Dialog('Copy to Artboards')
var rangeGroup, anchorList

rangeGroup = new RangeGroup(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT).also(function(group) {
    group.maxRange = document.artboards.length
    group.endEdit.text = document.artboards.length
    group.startEdit.activate()
})
dialog.hgroup(function(group) {
    group.setTooltips('Only relevant on artboard with different size than active artboard')
    group.staticText(BOUNDS_TEXT, 'Anchor:', JUSTIFY_RIGHT)
    anchorList = group.dropDownList(BOUNDS_EDIT, ANCHORS, function(it) {
        it.selectText('Top Left')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    app.copy()
    var selectQueues = selection
    document.artboards.forEach(function(artboard, artboardIndex) {
        if (artboardIndex !== activeArtboardIndex && rangeGroup.includes(artboardIndex)) {
            app.paste()
            var artboardRect = artboard.artboardRect
            selection.forEach(function(it, itemIndex) {
                selectQueues.push(it)
                var relativePosition = relativePositions[itemIndex]
                var x, y
                if (anchorList.selection.text.endsWith('Left')) {
                    x = artboardRect.getLeft() + relativePosition.getLeft()
                } else {
                    x = artboardRect.getRight() - relativePosition.getRight()
                }
                if (anchorList.selection.text.startsWith('Top')) {
                    y = artboardRect.getTop() + relativePosition.getTop()
                } else {
                    y = artboardRect.getBottom() - relativePosition.getBottom()
                }
                it.position = [x, y]
            })
        }
    })
    selection = selectQueues
})
dialog.show()