#target Illustrator
#include "../.lib/commons.js"

var ANCHORS = [
  ["Top Left", "ic_arrow_topleft"],
  ["Top Right", "ic_arrow_topright"],
  ["Bottom Left", "ic_arrow_bottomleft"],
  ["Bottom Right", "ic_arrow_bottomright"]
]

var BOUNDS_TEXT = [80, 21]
var BOUNDS_EDIT = [120, 21]
var BOUNDS_RADIO = [15, 15]

checkHasSelection()

check(document.artboards.length > 1, "No other artboards")
var activeArtboardIndex = document.artboards.getActiveArtboardIndex()
var activeArtboard = document.artboards[activeArtboardIndex]
var activeArtboardRect = activeArtboard.artboardRect

var proceed = true
if (!selection.all(function(it) { return it.geometricBounds.isWithin(activeArtboardRect) })) {
  proceed = confirm("Selected items are out of active artboard. Would you like to continue?")
}

if (proceed) {
  var relativePositions = selection.map(function(it) {
    var bounds = it.geometricBounds
    var relativeLeft = bounds.getLeft() - activeArtboardRect.getLeft()
    var relativeRight = activeArtboardRect.getRight() - bounds.getRight() + bounds.getWidth()
    var relativeTop = bounds.getTop() - activeArtboardRect.getTop()
    var relativeBottom = activeArtboardRect.getBottom() - bounds.getBottom() - bounds.getHeight()
    return [relativeLeft, relativeTop, relativeRight, relativeBottom]
  })

  var dialog = new Dialog("Copy to Artboards", "copy-to-artboards/")
  var rangeGroup, anchorList
  var prefs = preferences2.resolve("objects/copy_to_artboards")

  dialog.vgroup(function(main) {
    main.hgroup(function(group) {
      group.tips("Which artboards to paste")
      group.staticText(BOUNDS_TEXT, "Artboards:").also(JUSTIFY_RIGHT)
      rangeGroup = new RangeGroup(group, BOUNDS_EDIT).also(function(it) {
        it.maxRange = document.artboards.length
        it.endEdit.text = document.artboards.length
        it.startEdit.activate()
      })
    })
    main.hgroup(function(group) {
      group.tips("Duplicate by putting distance between selection and anchor.\nThis option is only available when artboards do not have the same size.")
      group.staticText(BOUNDS_TEXT, "Anchor:").also(JUSTIFY_RIGHT)
      anchorList = group.dropDownList(BOUNDS_EDIT, ANCHORS).also(function(it) {
        it.selectText(prefs.getString("anchor", "Top Left"))
      })
      group.enabled = document.artboards.any(function(it) {
        return !isEqualRounded(it.artboardRect.getWidth(), activeArtboardRect.getWidth()) ||
          !isEqualRounded(it.artboardRect.getHeight(), activeArtboardRect.getHeight())
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var readOnlySelection = selection
    document.artboards.forEach(function(artboard, artboardIndex) {
      if (artboardIndex === activeArtboardIndex || !rangeGroup.includes(artboardIndex)) {
        println(activeArtboardIndex + ". Ignore active artboard" + ".")
        return
      }
      var artboardRect = artboard.artboardRect
      readOnlySelection.forEachReversed(function(item, itemIndex) {
        var relativePosition = relativePositions[itemIndex]
        var x, y
        if (anchorList.selection.text.endsWith("Left")) {
          x = artboardRect.getLeft() + relativePosition.getLeft()
        } else {
          x = artboardRect.getRight() - relativePosition.getRight()
        }
        if (anchorList.selection.text.startsWith("Top")) {
          y = artboardRect.getTop() + relativePosition.getTop()
        } else {
          y = artboardRect.getBottom() - relativePosition.getBottom()
        }
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x, y]
        println("{0}. Position X={1} Y={2}.", artboardIndex, x, y)
      })
    })

    prefs.setString("anchor", anchorList.selection.text)
  })
  dialog.show()
}
