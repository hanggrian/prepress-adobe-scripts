// Iterate selection to showcase objects in layer.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var input = prompt('Wait interval in milliseconds:', '500', 'Showcase')
var interval = parseInt(input) || 0

check(interval > 0, 'Invalid interval')

var items = selection
showcase(items)

$.writeln('Done!')
selection = null

function showcase(items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.typename == 'GroupItem') {
            $.writeln('Iterating group ' + item.layerName())
            showcase(item.pageItems)
            $.writeln('Exiting group')
        } else {
            $.writeln('Showcasing ' + item.layerName())
            selection = item
            $.sleep(interval)
        }
    }
}