// Works great when selected items' order are connected to each other.
// When they are not connected, the final order will slightly change.

#target Illustrator
#include '../.lib/commons.js'

checkMultipleSelection()

var targetPositions = selection.map(function(it) { return it.absoluteZOrderPosition }).reverse()

selection.forEach(function(it, index) {
    var target = targetPositions[index]
    $.writeln('Moving ' + it.layerName() + ' from ' + it.absoluteZOrderPosition + ' to ' + target)
    while (target != it.absoluteZOrderPosition) {
        if (target > it.absoluteZOrderPosition) {
            it.zOrder(ZOrderMethod.BRINGFORWARD)
        } else {
            it.zOrder(ZOrderMethod.SENDBACKWARD)
        }
    }
})