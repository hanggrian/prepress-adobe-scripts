// Relink all selected PlacedItem with the same file name to different folder.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/relink.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PlacedItem' })
check(items.isNotEmpty(), 'No links found in selection')

var dialog = new Dialog('Relink Change Folder', 'fill')
var folder = openFolder(dialog.title)

if (folder != null) {
    var textBounds = [0, 0, 50, 21]
    var editBounds = [0, 0, 100, 21]

    dialog.dimension = new RelinkDimensionPanel(dialog.main)
    
    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        items.forEach(function(item) {
            var width = item.width 
            var height = item.height
            var position = item.position
            item.relink(folder.getFiles()
                .filter(function(file) { return file.name == item.file.name })
                .first())
            if (dialog.dimension.isMaintain()) {
                item.width = width
                item.height = height
                item.position = position
            }
        })
    })
    dialog.show()
}