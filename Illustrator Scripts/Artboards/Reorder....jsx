#target Illustrator
#include "../.lib/commons.js"

checkMultipleArtboards()

var dialog = new Dialog(R.string.reorder_artboards, "reordering-resizing-artboards/#reorder-artboards")
var orderingList
var config = configs.resolve("artboards/reorder")

dialog.vgroup(function(main) {
  orderingList = new OrderingList(main, [Ordering.nameList(), Ordering.positionList()]).also(function(it) {
    it.minimumSize.width = 230
    it.selection = config.getInt("order")
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var properties = []
  orderingList.forEach(document.artboards, function(it) {
    properties.push(Properties.copy(it))
  })
  Collections.forEach(document.artboards, function(it, i) {
    Properties.paste(properties[i], it)
  })

  config.setInt("order", orderingList.selection.index)
})
dialog.show()
