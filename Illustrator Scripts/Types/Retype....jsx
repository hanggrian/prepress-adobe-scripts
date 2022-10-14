#target illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === 'TextFrame' })
check(Collections.isNotEmpty(items),
  getString(R.string.error_notypes_selection, R.plurals.text.plural))

var dialog = new Dialog(R.string.retype, 'retyping-texts/#retype')
var inputEdit

dialog.hgroup(function(main) {
  main.alignChildren = 'top'
  main.leftStaticText(undefined, R.string.content)
  inputEdit = main.editText([400, 100], Collections.first(items).contents, { multiline: true })
    .also(ACTIVATE)
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var input = inputEdit.text
  Collections.forEach(items, function(it) {
    it.contents = input
  })
})
dialog.show()
