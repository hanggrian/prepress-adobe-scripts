/**
 * Gather length of all selected path items.
 * TODO: avoid duplicate paths in the same position and length.
 */

#include '../.lib/commons.js'

checkHasSelection()

var pathCount = 0
var totalRegistrationLength = 0
var totalNonRegistrationLength = 0

selection.forEach(function(it) { determine(it) })

var message = pathCount + ' paths measuring at ' +
    UnitValue(totalRegistrationLength + totalNonRegistrationLength, 'pt').as('cm').toFixed(2) + ' cm'
if (totalRegistrationLength > 0 && totalNonRegistrationLength > 0) {
    message += '\n' + 'Registration stroke: ' + UnitValue(totalRegistrationLength, 'pt').as('cm').toFixed(2) + ' cm'
    message += '\n' + 'Non-registration stroke: ' + UnitValue(totalNonRegistrationLength, 'pt').as('cm').toFixed(2) + ' cm'
}
alert(message, 'Measure Paths')

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
    if (item.strokeColor.equalTo(document.swatches['[registration]'].color)) {
        totalRegistrationLength += item.length    
    } else {
        totalNonRegistrationLength += item.length
    }
}