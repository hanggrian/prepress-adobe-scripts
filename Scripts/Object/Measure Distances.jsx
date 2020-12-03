/**
 * Gather length of all selected path items.
 */

#include '../.lib/core-units.js'
#include '../.lib/commons.js'

checkHasSelection()

var pathCount = 0
var distance = 0

selection.forEach(function(it) { determine(it) })

alert(pathCount + ' paths measuring at:\n' +
    distance.toFixed(2) + ' pt\n' +
    distance.toCm(2) + ' cm\n' +
    distance.toInch(2) + ' inch\n' +
    distance.toMm(2) + ' mm\n' +
    distance.toPica(2) + ' pica\n' +
    distance.toQ(2) + ' q')

function determine(item) {
    switch(item.typename) {
        case 'PathItem':
            pathCount++
            distance += item.length
            break;
        case 'GroupItem':
            for (var i = 0; i < item.pageItems.length; i++) {
                determine(item.pageItems[i])
            }
            break;
    }
}