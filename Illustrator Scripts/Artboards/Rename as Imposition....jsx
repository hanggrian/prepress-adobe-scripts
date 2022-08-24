#target Illustrator
#include "../.lib/commons.js"

var IMPOSITIONS = ["2-Up", "4-Up", "8-Up", "Saddle Stitch"]
var SIZE_INPUT = [120, 21]

var dialog = new Dialog("Rename as Imposition")
var startEdit, impositionList, nupGroup

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.tooltips("Imposition range")
    group.staticText(undefined, "Start:").also(JUSTIFY_RIGHT)
    startEdit = group.editText(SIZE_INPUT, "1").also(function(it) {
      it.validateDigits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips("Imposition type")
    group.staticText(undefined, "Mode:").also(JUSTIFY_RIGHT)
    impositionList = group.dropDownList(SIZE_INPUT, IMPOSITIONS).also(function(it) {
      it.selectText("2-Up")
      it.onChange = function() {
        var checksEnabled = it.selection.text !== "Saddle Stitch"
        nupGroup.duplexCheck.enabled = checksEnabled
        nupGroup.stackCheck.enabled = checksEnabled
      }
    })
  })
  nupGroup = new NUpOptionsGroup(main, false, true, true).also(function(it) {
    it.alignChildren = "right"
    it.orientation = "column"
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var start = parseInt(startEdit.text) - 1

  if (impositionList.selection.text === "2-Up") {
    if (!nupGroup.isStack()) {
      if (!nupGroup.isDuplex()) {
        new TwoUpSimplexPager(document, start).forEachArtboard(function() { })
      } else {
        new TwoUpDuplexPager(document, start).forEachArtboard(function() { })
      }
    } else {
      if (!nupGroup.isDuplex()) {
        new TwoUpSimplexStackPager(document, start).forEachArtboard(function() { })
      } else {
        new TwoUpDuplexStackPager(document, start).forEachArtboard(function() { })
      }
    }
  } else if (impositionList.selection.text === "4-Up") {
    if (!nupGroup.isStack()) {
      if (!nupGroup.isDuplex()) {
        new FourUpSimplexPager(document, start).forEachArtboard(function() { })
      } else {
        new FourUpDuplexPager(document, start).forEachArtboard(function() { })
      }
    } else {
      if (!nupGroup.isDuplex()) {
        new FourUpSimplexStackPager(document, start).forEachArtboard(function() { })
      } else {
        new FourUpDuplexStackPager(document, start).forEachArtboard(function() { })
      }
    }
  } else if (impositionList.selection.text === "8-Up") {
    if (!nupGroup.isStack()) {
      if (!nupGroup.isDuplex()) {
        new EightUpSimplexPager(document, start).forEachArtboard(function() { })
      } else {
        new EightUpDuplexPager(document, start).forEachArtboard(function() { })
      }
    } else {
      if (!nupGroup.isDuplex()) {
        new EightUpSimplexStackPager(document, start).forEachArtboard(function() { })
      } else {
        new EightUpDuplexStackPager(document, start).forEachArtboard(function() { })
      }
    }
  } else if (impositionList.selection.text === "Saddle Stitch") {
    new SaddleStitchPager(document, start).forEachArtboard(function() { })
  }
})
dialog.show()
