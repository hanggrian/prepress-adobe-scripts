#target Illustrator
#include "../.lib/commons.js"

check(document.artboards.length > 1, "No other artboards")

var dialog = new Dialog("Reorder Artboards", "reordering-resizing-artboards/#reorder-artboards")
var orderByList
var config = configs.resolve("artboards/reorder")

dialog.vgroup(function(main) {
  orderByList = new OrderByList(main, [ORDER_NAMES, ORDER_POSITIONS]).also(function(it) {
    it.minimumSize.width = 230
    it.selectText(config.getString("order", "Horizontal"))
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

  config.setString("order", orderByList.selection.text)
})
dialog.show()
