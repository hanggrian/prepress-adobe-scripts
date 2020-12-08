/**
 * Gather length of all selected path items.
 * TODO: avoid duplicate paths in the same position and length.
 */

#include '../.lib/commons.js'

checkHasSelection()

var innerCount = 0

selection.forEach(function(it) {
    determine(it)
})

alert('There are ' + selection.length + ' items.\n' +
    innerCount + ' if you count grouped items.',
    'Count Objects')

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