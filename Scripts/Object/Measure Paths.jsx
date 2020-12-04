/**
 * Gather length of all selected path items.
 * TODO: avoid duplicate paths in the same position and length.
 */

#include '../.lib/core-units.js'
#include '../.lib/commons.js'

checkHasSelection()

var pathCount = 0
var totalLength = 0

selection.forEach(function(it) { determine(it) })

alert(pathCount + ' paths measuring at:\n' +
    totalLength.toFixed(2) + ' pt\n' +
    totalLength.toCm(2) + ' cm\n' +
    totalLength.toInch(2) + ' inch\n' +
    totalLength.toMm(2) + ' mm\n' +
    totalLength.toPica(2) + ' pica\n' +
    totalLength.toQ(2) + ' q',
    'Measure Paths')

function determine(item) {
    switch(item.typename) {
        case 'PathItem':
            increment(item)
            break;
        case 'CompoundPathItem':
            for (var i = 0; i < item.pathItems.length; i++) {
                increment(item.pathItems[i])
            }
            break;
        case 'GroupItem':
            for (var i = 0; i < item.pageItems.length; i++) {
                determine(item.pageItems[i])
            }
            break;
    }
}

function increment(item) {
    pathCount++
    totalLength += item.length
}