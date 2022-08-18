#target Illustrator
#include "../.lib/commons.js"

check(document.artboards.length > 1, "No other artboards")

var dialog = new Dialog("Reorder Artboards", "reordering-resizing-artboards/#reorder-artboards")
var orderByGroup
var prefs = preferences2.resolve("artboards/reorder")

dialog.vgroup(function(main) {
  orderByGroup = new OrderByGroup(main, [ORDER_NAMES, ORDER_POSITIONS]).also(function(it) {
    it.list.minimumSize.width = 230
    it.list.selectText(prefs.getString("order", "Horizontal"))
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var properties = []
  orderByGroup.forEach(document.artboards, function(it) {
    properties.push(Properties.copy(it))
  })
  Collections.forEach(document.artboards, function(it, i) {
    Properties.paste(properties[i], it)
  })

  prefs.setString("order", orderByGroup.list.selection.text)
})
dialog.show()
