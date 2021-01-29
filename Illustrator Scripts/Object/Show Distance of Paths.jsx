// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#include '../.lib/commons.js'

checkHasSelection()

var count = 0, registrationCount = 0
var distance = 0, registrationDistance = 0

selection.forEach(function(it) { determine(it) })

var message = (count + registrationCount) + ' paths measuring at ' + formatUnit(distance + registrationDistance, 'cm', 2)
if (distance > 0 && registrationDistance > 0) {
    message += '\nConsist of:\n' +
        count + ' non-registrations (' + formatUnit(distance, 'cm', 2) + ')\n' +
        registrationCount + ' registrations (' + formatUnit(registrationDistance, 'cm', 2) + ')'
}
alert(message, 'Show Distance of Paths')

function determine(item) {
    switch (item.typename) {
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
        registrationDistance += item.length
    } else {
        count++
        distance += item.length
    }
}