#target Illustrator
#include '../.lib/core.js'
#include '../.lib/ui.js'

const ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

const BOUNDS_TEXT = [0, 0, 65, 21]

checkHasSelection()

init('Rename sequence')

root.sequence = root.addVPanel('Sequence')
root.sequence.alignChildren = 'fill'
root.sequence.stops = root.sequence.addHGroup()
root.sequence.stops.add('statictext', BOUNDS_TEXT, 'Stops at:').justify = 'right'
var stopsList = root.sequence.stops.add('dropdownlist', undefined, ALPHABETS)
stopsList.selection = 1
root.sequence.space = root.sequence.addHGroup()
root.sequence.space.add('statictext', BOUNDS_TEXT, 'Add space:').justify = 'right'
var spaceCheck = root.sequence.space.add('checkbox', undefined)

root.reverse = root.addVGroup()
root.reverse.alignment = 'right'
var reverseCheck = root.reverse.add('checkbox', undefined, 'Reverse order')

var prefix = 1
var count = 0
var stopsAt

addAction('Cancel')
addAction('OK', function() {
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == stopsList.selection.text) {
            stopsAt = i + 1
        }
    }
    if (!reverseCheck.value) {
        for (var i = 0; i < selection.length; i++) {
            rename(selection[i])
        }
    } else {
        for (var i = selection.length - 1; i >= 0; i--) {
            rename(selection[i])
        }
    }
})
show()

function rename(item) {
    if (item.typename == 'TextFrame') {
        var s = prefix.toString()
        if (spaceCheck.value) {
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