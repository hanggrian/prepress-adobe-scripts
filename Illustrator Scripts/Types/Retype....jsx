#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === "TextFrame" })
check(Collections.isNotEmpty(items), "No types found in selection")

var dialog = new Dialog("Retype", "retyping-texts/#retype")
var inputEdit

dialog.hgroup(function(main) {
  main.alignChildren = "top"
  main.staticText(undefined, "Content:")
  inputEdit = main.editText([400, 100], Collections.first(items).contents, { multiline: true }).also(ACTIVATE)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var input = inputEdit.text
  Collections.forEach(items, function(it) {
    it.contents = input
  })
})
dialog.show()
