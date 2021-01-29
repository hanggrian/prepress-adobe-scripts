// Sum up all items recursively.

#include '../.lib/commons.js'

checkHasSelection()

var innerCount = 0

selection.forEach(function(it) { determine(it) })

var message = 'There are ' + selection.length + ' items.'
if (selection.length != innerCount) {
    message += '\n' + innerCount + ' items across all groups.'
}
alert(message, 'Show Count')

function determine(item) {
    switch (item.typename) {
        case 'GroupItem':
            for (var i = 0; i < item.pageItems.length; i++) {
                determine(item.pageItems[i])
            }
            break;
        default:
            innerCount++
            break;
    }
}