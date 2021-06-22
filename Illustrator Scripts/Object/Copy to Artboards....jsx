#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/range.js'

var ANCHORS = ['Top Left'/** , 'Top Right', 'Bottom Left', 'Bottom Right' */]

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

check(document.artboards.length > 1, 'No other artboards')
var activeArtboardIndex = document.artboards.getActiveArtboardIndex()
var activeArtboard = document.artboards[activeArtboardIndex]
var activeArtboardRect = activeArtboard.artboardRect

selection.forEach(function(it) {
    check(rectangleContains(activeArtboardRect, it.controlBounds), 'Selected item is out of active artboard')
})

var relativePositions = selection.map(function(it) {
    var bounds = it.controlBounds
    var relativeX = bounds[0] - activeArtboardRect[0]
    var relativeY = bounds[1] - activeArtboardRect[1]
    return [relativeX, relativeY]
})

var dialog = new Dialog('Copy to Artboards')
var rangeGroup, anchorList

rangeGroup = new RangeGroup(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
rangeGroup.maxRange = document.artboards.length
rangeGroup.endEdit.text = document.artboards.length
rangeGroup.startEdit.activate()
dialog.hgroup(function(group) {
    group.setTooltips('Only relevant on artboard with different size than active artboard')
    group.staticText(BOUNDS_TEXT, 'Anchor:', JUSTIFY_RIGHT)
    anchorList = group.dropDownList(BOUNDS_EDIT, ANCHORS, function(it) {
        it.selection = ANCHORS.indexOf('Top Left')
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
                it.position = [
                    artboardRect[0] + relativePosition[0],
                    artboardRect[1] + relativePosition[1]
                ]
            })
        }
    })
    selection = selectQueues
})
dialog.show()

// see https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
function rectangleContains(a, b) {
	return !(
		b[0] < a[0] ||
		b[3] < a[3] ||
		b[2] > a[2] ||
		b[1] > a[1]
	);
}