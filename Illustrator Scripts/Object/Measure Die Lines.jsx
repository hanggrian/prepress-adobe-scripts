// Measure length of all selected path items.
// TODO: avoid duplicate paths in the same position and length.

#include '../.lib/commons.js'

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'PathItem' || it.typename == 'CompoundPathItem' })
check(items.isNotEmpty(), 'No paths found in selection')

var count = 0, registrationCount = 0
var distance = 0, registrationDistance = 0
items.forEachItem(function(it) {
    switch (it.typename) {
        case 'PathItem':
            increment(it)
            break;
        case 'CompoundPathItem':
            for (var i = 0; i < it.pathItems.length; i++) {
                increment(it.pathItems[i])
            }
            break;
    }
})

var message = (count + registrationCount) + ' paths measuring at ' + formatUnit(distance + registrationDistance, 'cm', 2)
if (distance > 0 && registrationDistance > 0) {
    message += '\nConsist of:\n' +
        count + ' non-registrations (' + formatUnit(distance, 'cm', 2) + ')\n' +
        registrationCount + ' registrations (' + formatUnit(registrationDistance, 'cm', 2) + ')'
}
alert(message, 'Measure Die Lines')

function increment(item) {
    if (isColorEqual(item.strokeColor, getRegistrationColor())) {
        registrationCount++
        registrationDistance += item.length
    } else {
        count++
        distance += item.length
    }
}