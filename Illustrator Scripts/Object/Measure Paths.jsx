/**
 * Gather length of all selected path items.
 * TODO: avoid duplicate paths in the same position and length.
 */

#include '../.lib/commons.js'

checkHasSelection()

var count = 0, registrationCount = 0
var length = 0, registrationLength = 0

selection.forEach(function(it) { determine(it) })

var message = (count + registrationCount) + ' paths measuring at ' + asCmString(length + registrationLength)
if (length > 0 && registrationLength > 0) {
    message += '\nConsist of:\n' +
        count + ' non-registrations (' + asCmString(length) + ')\n' +
        registrationCount + ' registrations (' + asCmString(registrationLength) + ')'
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
    if (isColorEqual(item.strokeColor, getRegistrationColor())) {
        registrationCount++
        registrationLength += item.length
    } else {
        count++
        length += item.length
    }
}

function asCmString(pt) {
    return UnitValue(pt, 'pt').as('cm').toFixed(2) + ' cm'
}