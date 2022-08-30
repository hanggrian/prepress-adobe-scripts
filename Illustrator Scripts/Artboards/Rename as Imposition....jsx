#target Illustrator
#include "../.lib/commons.js"

function listImpositions() {
  return [
    getString(R.string.n_up, 2),
    getString(R.string.n_up, 4),
    getString(R.string.n_up, 8),
    R.string.saddle_stitch
  ]
}

var SIZE_INPUT = [120, 21]

var dialog = new Dialog(R.string.rename_as_imposition)
var startEdit, impositionList, nupGroup

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_renameasimposition_start)
    group.leftStaticText(undefined, R.string.start)
    startEdit = group.editText(SIZE_INPUT, "1").also(function(it) {
      it.validateDigits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.tooltips(R.string.tip_renameasimposition_mode)
    group.leftStaticText(undefined, R.string.mode)
    impositionList = group.dropDownList(SIZE_INPUT, listImpositions()).also(function(it) {
      it.onChange = function() {
        var duplexAndStackEnabled = it.selection.index !== 3
        nupGroup.foldingCheck.enabled = it.selection.index === 1 || it.selection.index === 2
        nupGroup.duplexCheck.enabled = duplexAndStackEnabled
        nupGroup.stackCheck.enabled = duplexAndStackEnabled
      }
    })
  })
  nupGroup = new NUpOptionsGroup(main, true, false).also(function(it) {
    it.alignChildren = "right"
    it.orientation = "column"
    it.foldingCheck.enabled = false
    it.duplexCheck.enabled = false
    it.stackCheck.enabled = false
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  if (impositionList.selection === null) {
    errorWithAlert(getString(R.string.erri))
  }

  var start = parseInt(startEdit.text) - 1
  switch (impositionList.selection.index) {
    case 0:
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
      break;
    case 1:
      if (nupGroup.isFolding()) {
        new FourUpFoldingPager(document, start).forEachArtboard(function() { })
      } else {
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
      }
      break;
    case 2:
      if (nupGroup.isFolding()) {
        new EightUpFoldingPager(document, start).forEachArtboard(function() { })
      } else {
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
      }
      break;
    default:
      new SaddleStitchPager(document, start).forEachArtboard(function() { })
      break;
  }
})
dialog.show()
