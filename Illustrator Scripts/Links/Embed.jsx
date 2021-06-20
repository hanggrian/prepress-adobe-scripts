#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

items.forEach(function(it) { it.embed() })