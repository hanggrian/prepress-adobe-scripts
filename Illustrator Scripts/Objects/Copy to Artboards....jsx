#target Illustrator
#include "../.lib/commons.js"

function listAnchors() {
  return [
    [R.string.top_left, "ic_arrow_topleft"],
    [R.string.top_right, "ic_arrow_topright"],
    [R.string.bottom_left, "ic_arrow_bottomleft"],
    [R.string.bottom_right, "ic_arrow_bottomright"]
  ]
}

var SIZE_INPUT = [150, 21]

checkHasSelection()

check(document.artboards.length > 1, "No other artboards")
var activeArtboardIndex = document.artboards.getActiveArtboardIndex()
var activeArtboard = document.artboards[activeArtboardIndex]
var activeArtboardRect = activeArtboard.artboardRect

var proceed = true
if (!Collections.all(selection, function(it) { return it.geometricBounds.isWithin(activeArtboardRect) })) {
  proceed = Windows.confirm(R.string.confirm_copytoartboards)
}

if (proceed) {
  var relativePositions = Collections.map(selection, function(it) {
    var bounds = it.geometricBounds
    var relativeLeft = bounds.getLeft() - activeArtboardRect.getLeft()
    var relativeRight = activeArtboardRect.getRight() - bounds.getRight() + bounds.getWidth()
    var relativeTop = bounds.getTop() - activeArtboardRect.getTop()
    var relativeBottom = activeArtboardRect.getBottom() - bounds.getBottom() - bounds.getHeight()
    return [relativeLeft, relativeTop, relativeRight, relativeBottom]
  })

  var dialog = new Dialog("Copy to Artboards", "copy-to-artboards/")
  var rangeGroup, anchorList
  var config = configs.resolve("objects/copy_to_artboards")

  dialog.vgroup(function(main) {
    main.alignChildren = "right"
    main.hgroup(function(group) {
      group.tooltips(R.string.tip_copytoartboards_artboards)
      group.leftStaticText(undefined, R.string.artboards)
      rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
        it.maxRange = document.artboards.length
        it.endEdit.text = document.artboards.length
        it.startEdit.activate()
      })
    })
    main.hgroup(function(group) {
      group.tooltips(R.string.tip_copytoartboards_anchor)
      group.leftStaticText(undefined, R.string.anchor)
      anchorList = group.dropDownList(SIZE_INPUT, listAnchors()).also(function(it) {
        it.selection = config.getInt("anchor")
      })
      group.enabled = Collections.any(document.artboards, function(it) {
        return !isEqualRounded(it.artboardRect.getWidth(), activeArtboardRect.getWidth()) ||
          !isEqualRounded(it.artboardRect.getHeight(), activeArtboardRect.getHeight())
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var readOnlySelection = selection
    Collections.forEach(document.artboards, function(artboard, artboardIndex) {
      if (artboardIndex === activeArtboardIndex || !rangeGroup.includes(artboardIndex)) {
        println(activeArtboardIndex + ". Ignore active artboard" + ".")
        return
      }
      var artboardRect = artboard.artboardRect
      Collections.forEachReversed(readOnlySelection, function(item, itemIndex) {
        var relativePosition = relativePositions[itemIndex]
        var x, y
        if (anchorList.selection.text === getString(R.string.top_left) ||
          anchorList.selection.text === getString(R.string.left) ||
          anchorList.selection.text === getString(R.string.bottom_left)) {
          x = artboardRect.getLeft() + relativePosition.getLeft()
        } else {
          x = artboardRect.getRight() - relativePosition.getRight()
        }
        if (anchorList.selection.text === getString(R.string.top_left) ||
          anchorList.selection.text === getString(R.string.top) ||
          anchorList.selection.text === getString(R.string.top_right)) {
          y = artboardRect.getTop() + relativePosition.getTop()
        } else {
          y = artboardRect.getBottom() - relativePosition.getBottom()
        }
        item.duplicate(layer, ElementPlacement.PLACEATBEGINNING).position = [x, y]
        println("%d. Position X=%d Y=%d.", artboardIndex, x, y)
      })
    })

    config.setInt("anchor", anchorList.selection.index)
  })
  dialog.show()
}
