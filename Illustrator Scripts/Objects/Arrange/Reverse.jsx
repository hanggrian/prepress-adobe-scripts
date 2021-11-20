#target Illustrator
#include '../../.lib/commons.js'

checkMultipleSelection()

var initialPositions = [selection[0].absoluteZOrderPosition]
for (var i = 1; i < selection.length; i++) {
    check(selection[i - 1].absoluteZOrderPosition - selection[i].absoluteZOrderPosition === 1,
        'Objects to arrange must be connected to each other')
    initialPositions.push(selection[i].absoluteZOrderPosition)
}

// find reversed position and keep ordering until met
selection.forEach(function(it, index) {
    var reversedPosition = initialPositions[initialPositions.lastIndex() - index]
    println('Moving {0} from {1} to {2}', it.getLayerName(), it.absoluteZOrderPosition, reversedPosition)
    while (it.absoluteZOrderPosition < reversedPosition) {
        it.zOrder(ZOrderMethod.BRINGFORWARD)
    }
    while (it.absoluteZOrderPosition > reversedPosition) {
        it.zOrder(ZOrderMethod.SENDBACKWARD)
    }
})