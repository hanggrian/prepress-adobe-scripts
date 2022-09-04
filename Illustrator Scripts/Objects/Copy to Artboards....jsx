#target Illustrator
#include "../.lib/commons.js"

var Anchor = Enums.of({
  TOP_LEFT: { name: R.string.top_left, image: "ic_arrow_topleft" },
  TOP_RIGHT: { name: R.string.top_right, image: "ic_arrow_topright" },
  BOTTOM_LEFT: { name: R.string.bottom_left, image: "ic_arrow_bottomleft" },
  BOTTOM_RIGHT: { name: R.string.bottom_right, image: "ic_arrow_bottomright" }
}, true)

var SIZE_INPUT = [150, 21]

checkHasSelection()
checkMultipleArtboards()

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
      group.helpTips = R.string.tip_copytoartboards_artboards
      group.leftStaticText(undefined, R.string.artboards)
      rangeGroup = new RangeGroup(group, SIZE_INPUT).also(function(it) {
        it.maxRange = document.artboards.length
        it.endEdit.text = document.artboards.length
        it.startEdit.activate()
      })
    })
    main.hgroup(function(group) {
      group.helpTips = R.string.tip_copytoartboards_anchor
      group.leftStaticText(undefined, R.string.anchor)
      anchorList = group.dropDownList(SIZE_INPUT, Anchor.list()).also(function(it) {
        it.selection = config.getInt("anchor")
      })
    })
  })
  dialog.setCancelButton()
  dialog.setDefaultButton(undefined, function() {
    var anchor = Anchor.valueOf(anchorList.selection)
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
        if (anchor === Anchor.TOP_LEFT || anchor === Anchor.BOTTOM_LEFT) {
          x = artboardRect.getLeft() + relativePosition.getLeft()
        } else {
          x = artboardRect.getRight() - relativePosition.getRight()
        }
        if (anchor === Anchor.TOP_LEFT || anchor === Anchor.TOP_RIGHT) {
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
