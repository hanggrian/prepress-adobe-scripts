#target Illustrator
#include '../.lib/commons.js'

checkMultipleSelection()

var initialPositions = [selection[0].absoluteZOrderPosition]
for (var i = 1; i < selection.length; i++) {
    check(selection[i - 1].absoluteZOrderPosition - selection[i].absoluteZOrderPosition === 1,
        'Objects to arrange must be connected to each other')
    initialPositions.push(selection[i].absoluteZOrderPosition)
}

var dialog = new Dialog('Rearrange Objects')
var orderByGroup

dialog.vgroup(function(main) {
    orderByGroup = new OrderByGroup(main, [ORDER_POSITIONS]).also(function(it) {
        it.list.minimumSize.width = 280
        it.list.selectText('Horizontal')
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    // the idea is to keep pusing item to bottommost
    orderByGroup.forEach(selection, function(it) {
        var times = it.absoluteZOrderPosition - initialPositions.last()
        println('Moving {0} {1} times', it.getLayerName(), times)
        repeat(times, function() {
            it.zOrder(ZOrderMethod.SENDBACKWARD)
        })
    })
})
dialog.setHelpButton('Reverse', function() {
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
})
dialog.show()