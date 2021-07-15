#target Illustrator
#include '../.lib/commons.js'

var ANCHORS = ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right']

var BOUNDS_TEXT = [70, 21]
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

dialog.vgroup(function(main) {
    main.hgroup(function(group) {
        group.tips('Which artboards to paste')
        group.staticText(BOUNDS_TEXT, 'Artboards:').also(JUSTIFY_RIGHT)
        rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
            it.maxRange = document.artboards.length
            it.endEdit.text = document.artboards.length
            it.startEdit.activate()
        })
    })
    main.hgroup(function(group) {
        group.tips('Only relevant on artboard with different size than active artboard')
        group.staticText(BOUNDS_TEXT, 'Anchor:').also(JUSTIFY_RIGHT)
        anchorList = group.dropDownList(BOUNDS_EDIT, ANCHORS).also(function(it) {
            it.selectText('Top Left')
            it.enabled = !areArtboardSizesEqual()
        })
    })
})
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    app.copy()
    var selectQueues = selection
    document.artboards.forEach(function(artboard, artboardIndex) {
        if (artboardIndex === activeArtboardIndex || !rangeGroup.includes(artboardIndex)) {
            $.writeln(activeArtboardIndex + '. Ignore active artboard')
            return
        }
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
            $.writeln(artboardIndex + '. ' + 'Position X=' + x + ' Y=' + y)
            it.position = [x, y]
        })
    })
    selection = selectQueues
})
dialog.show()

function areArtboardSizesEqual() {
    var width, height
    for (var i = 0; i < document.artboards.length; i++) {
        var rect = document.artboards[i].artboardRect
        if (width === undefined) {
            width = rect.getWidth()
        } else if (width !== rect.getWidth()) {
            return false
        }
        if (height === undefined) {
            height = rect.getHeight()
        } else if (height !== rect.getHeight()) {
            return false
        }
    }
    return true
}