// Rename file link with auto-relink.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')
check(items.map(function(it) { it.file }).distinct().length === 1, 'Multiple files are associated with selected links.')

var file = items.first().file
checkNotNull(file)

var currentFileName = file.fileName()
var currentFileExt = file.fileExt()

var input = prompt('New file name:', currentFileName, 'Relink Rename File')

if (input !== null) {
    if (input === '') {
        alert('Invalid input.', 'Relink Rename File')
    } else if (input === currentFileName) {
        alert('Unchanged.', 'Relink Rename File')
    } else {
        var newFileName = input + '.' + currentFileExt
        var parent = file.parent // reference will be unavailable after rename
        var success = file.rename(newFileName)
        if (!success) {
            alert("Can't rename.", 'Relink Rename File')
        } else {
            var newFile = parent.getFiles()
                .filter(function(it) { return unescape(it.name) === newFileName })
                .first()
            items.forEach(function(item) { item.relink(newFile) })
        }
    }
}