#target Illustrator
#include "../.lib/commons.js"

var SIZE_INPUT = [120, 21]

var dialog = new Dialog(R.string.rename_as_imposition)
var startEdit, impositionList, nupGroup

var imposition

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_renameasimposition_start
    group.leftStaticText(undefined, R.string.start)
    startEdit = group.editText(SIZE_INPUT, "1").also(function(it) {
      it.validateDigits()
      it.activate()
    })
  })
  main.hgroup(function(group) {
    group.helpTips = R.string.tip_renameasimposition_mode
    group.leftStaticText(undefined, R.string.mode)
    impositionList = group.dropDownList(SIZE_INPUT, Imposition.list()).also(function(it) {
      it.onChange = function() {
        imposition = Imposition.valueOf(it.selection)
        var duplexAndStackEnabled = imposition === Imposition.TWO_UP ||
          imposition === Imposition.FOUR_UP || imposition === Imposition.EIGHT_UP
        nupGroup.foldingCheck.enabled = imposition === Imposition.FOUR_UP || imposition === Imposition.EIGHT_UP
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
  var start = parseInt(startEdit.text) - 1
  var pager
  if (imposition === Imposition.TWO_UP) {
    pager = imposition.getPager(document, start, nupGroup.isDuplex(), nupGroup.isStack())
  } else if (imposition === Imposition.FOUR_UP || imposition === Imposition.EIGHT_UP) {
    pager = imposition.getPager(document, start, nupGroup.isFolding(), nupGroup.isDuplex(), nupGroup.isStack())
  } else {
    pager = imposition.getPager(document, start)
  }
  pager.forEachArtboard(function() { })
})
dialog.show()
