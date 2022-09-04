// TODO: find out why `TextFrame.textRanges` are always undefined.
// TODO: find out why `app.textFonts` are always undefined.

#target Illustrator
#include "../.lib/commons.js"

checkHasSelection()

var items = Collections.filterItem(selection, function (it) { return it.typename === "TextFrame" })
check(Collections.isNotEmpty(items), getString(R.string.error_notypes_selection, R.plurals.text.plural))

Windows.alert(textFonts.first())
var fonts = Collections.distinct(
  Collections.filter(
    Collections.map(items, function (item) { return item.textRange.characterAttributes.textFont }),
    function (font) { return textFonts.contains(font) }))

    Windows.alert(fonts)
