/**
 * Sum up all items recursively.
 */

#include '../.lib/commons.js'

checkHasSelection()

var innerCount = 0

selection.forEach(function(it) { determine(it) })

var message = 'There are ' + selection.length + ' items.'
if (selection.length != innerCount) {
    message += '\n' + innerCount + ' if you count grouped items.'
}
alert(message, 'Count Objects')

function determine(item) {
    switch(item.typename) {
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