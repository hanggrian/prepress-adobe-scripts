// TODO: find out why `TextFrame.textRanges` are always undefined.
// TODO: find out why `app.textFonts` are always undefined.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

alert(textFonts.first())
var fonts = items.map(function(item) { return item.textRange.characterAttributes.textFont })
  .filter(function(font) { return textFonts.contains(font) })
  .distinct()

alert(fonts)