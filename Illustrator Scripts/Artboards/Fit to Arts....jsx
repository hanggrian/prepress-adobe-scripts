//@target illustrator
//@include '../.lib/commons.js'

var dialog = new Dialog(R.string.fit_to_arts)
var rangeGroup

dialog.hgroup(function(main) {
  main.leftStaticText(undefined, R.string.range)
  rangeGroup = new RangeGroup(main, [150, 21]).also(function(it) {
    it.maxRange = document.artboards.length
    it.endEdit.text = document.artboards.length
    it.startEdit.activate()
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  if (!rangeGroup.isValid()) {
    return Windows.alert(R.string.error_range, dialog.text, true)
  }
  var temp = selection // preserve selection
  Collections.forEach(rangeGroup.toArray(), function(i) {
    document.artboards.setActiveArtboardIndex(i)
    document.selectObjectsOnActiveArtboard(i)
    document.fitArtboardToSelectedArt(i)
  })
  selection = temp
})
dialog.show()
