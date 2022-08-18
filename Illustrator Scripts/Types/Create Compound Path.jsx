#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === "TextFrame" })
check(Collections.isNotEmpty(items), "No types found in selection")

var createdItems = []
Collections.forEach(items, function(it) {
  selection = [it] // isolate selection so that compound path are created individually
  var group = it.createOutline()
  Collections.forEach(group.compoundPathItems, function(compoundPathItem) {
    Collections.forEach(compoundPathItem.pathItems, function(pathItem) {
      pathItem.duplicate(layer, ElementPlacement.PLACEATBEGINNING)
    })
  })
  group.remove()
  app.executeMenuCommand("compoundPath")
  createdItems.push(Collections.first(selection))
})
selection = createdItems
