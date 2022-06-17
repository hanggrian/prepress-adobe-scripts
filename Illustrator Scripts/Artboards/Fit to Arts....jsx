#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Fit to Arts')
var rangeGroup

dialog.hgroup(function(main) {
  main.staticText(undefined, 'Range:').also(JUSTIFY_RIGHT)
  rangeGroup = new RangeGroup(main, [150, 21]).also(function(it) {
    it.startEdit.activate()
    it.endEdit.text = document.artboards.length
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  rangeGroup.forEach(function(i) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
  })
})
dialog.show()
