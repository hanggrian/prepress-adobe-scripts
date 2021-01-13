// Works great when selected items' order are connected to each other.
// When they are not connected, the final order will slightly change.

#target Illustrator
#include '../.lib/commons.js'

checkHasSelection()

var targetPositions = selection.map(function(it) { return it.zOrderPosition }).reverse()

selection.forEach(function(it, index) {
    var target = targetPositions[index]
    $.writeln('Moving ' + it.layerName() + ' from ' + it.zOrderPosition + ' to ' + target)
    while (target != it.zOrderPosition) {
        if (target > it.zOrderPosition) {
            it.zOrder(ZOrderMethod.BRINGFORWARD)
        } else {
            it.zOrder(ZOrderMethod.SENDBACKWARD)
        }
    }
})