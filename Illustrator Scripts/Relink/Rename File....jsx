// Rename file link with auto-relink.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

check(items.map(function(it) { it.file }).distinct().length === 1, 'Multiple files are associated with selected links.')
/*
var item = selection.first()
checkTypename(selection.first(), 'PlacedItem')
checkNotNull(item.file)

var currentName = item.file.fileName()
var currentExt = item.file.fileExt()

var input = prompt('New file name:', currentName, 'Relink Rename File')

if (input !== null) {
    if (input === '') {
        alert('Invalid input.', 'Relink Rename File')
    } else if (input === currentName) {
        alert('Unchanged.', 'Relink Rename File')
    } else {
        var newName = input + '.' + currentExt
        var parent = item.file.parent // reference will be unavailable after rename
        var success = item.file.rename(newName)
        if (!success) {
            alert("Can't rename.", 'Relink Rename File')
        } else {
            item.relink(parent.getFiles()
                .filter(function(file) { return unescape(file.name) === newName })
                .first())
        }
    }
}*/