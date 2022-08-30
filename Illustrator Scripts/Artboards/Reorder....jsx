#target Illustrator
#include "../.lib/commons.js"

check(document.artboards.length > 1, "No other artboards")

var dialog = new Dialog(R.string.reorder_artboards, "reordering-resizing-artboards/#reorder-artboards")
var orderByList
var config = configs.resolve("artboards/reorder")

dialog.vgroup(function(main) {
  orderByList = new OrderByList(main, [OrderBy.names(), OrderBy.positions()]).also(function(it) {
    it.minimumSize.width = 230
    it.selection = config.getInt("order")
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var properties = []
  orderByList.forEach(document.artboards, function(it) {
    properties.push(Properties.copy(it))
  })
  Collections.forEach(document.artboards, function(it, i) {
    Properties.paste(properties[i], it)
  })

  config.setInt("order", orderByList.selection.index)
})
dialog.show()
