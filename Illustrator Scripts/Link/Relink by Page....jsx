// Apply relink once to all selected `PlacedItem`,
// as opposed to native Illustrator `Relink...` which is done individually.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/dialog.js'
#include '../.lib/picker.js'

checkHasSelection()
selection.forEach(function(it) {
    checkTypename(it, 'PlacedItem')
})

var dialog = new Dialog('Relink by Page')
var picker = new Picker(dialog.title, [
    ['Adobe Illustrator', 'ai'],
    ['Adobe PDF', 'pdf']
], true)

dialog.source = picker.getGroup(dialog.main, [0, 0, 45, 21])
dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selection.forEach(function(it) {
        it.relink(picker.file)
    })
})
dialog.show()