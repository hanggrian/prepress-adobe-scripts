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

alert(pathCount + ' paths measuring at ' + UnitValue(totalLength, 'pt').as('cm').toFixed(2) + ' cm',
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