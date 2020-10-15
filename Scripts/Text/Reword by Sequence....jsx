#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

var BOUNDS_TEXT = [0, 0, 65, 21]

checkHasSelection()

createDialog('Reword Texts by Sequence')

var sequence = dialog.main.addVPanel('Sequence')
sequence.alignChildren = 'fill'
sequence.stops = sequence.addHGroup()
sequence.stops.add('statictext', BOUNDS_TEXT, 'Stops at:').justify = 'right'
sequence.stopsList = sequence.stops.add('dropdownlist', undefined, ALPHABETS)
sequence.stopsList.selection = 1
sequence.space = sequence.addHGroup()
sequence.space.add('statictext', BOUNDS_TEXT, 'Add space:').justify = 'right'
sequence.spaceCheck = sequence.space.add('checkbox', undefined)

var reverse = dialog.main.addVGroup()
reverse.alignment = 'right'
reverse.reverseCheck = reverse.add('checkbox', undefined, 'Reverse order')

var prefix = 1
var count = 0
var stopsAt

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == sequence.stopsList.selection.text) {
            stopsAt = i + 1
        }
    }
    if (!reverse.reverseCheck.value) {
        selection.forEach(function(it) {
            rename(it)
        })
    } else {
        selection.forEachReversed(function(it) {
            rename(it)
        })
    }
})
show()

function rename(item) {
    if (item.typename == 'TextFrame') {
        var s = prefix.toString()
        if (sequence.spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]

        var words = item.words
        words.removeAll()
        words.add(s)

        count++
        if (count == stopsAt) {
            prefix++
            count = 0
        }
    }
}