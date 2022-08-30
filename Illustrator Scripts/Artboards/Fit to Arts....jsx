#target Illustrator
#include "../.lib/commons.js"

var dialog = new Dialog(R.string.fit_to_arts)
var rangeGroup

dialog.hgroup(function(main) {
  main.leftStaticText(undefined, R.string.range)
  rangeGroup = new RangeGroup(main, [150, 21]).also(function(it) {
    it.startEdit.activate()
    it.endEdit.text = document.artboards.length
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var temp = selection // preserve selection
  rangeGroup.forEach(function(i) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
  })
  selection = temp
})
dialog.show()
