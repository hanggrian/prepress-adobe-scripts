#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()

createDialog('Retype by Alphabet')

var textBounds = [0, 0, 65, 21]
dialog.sequence = dialog.main.addVPanel('Alphabet')
dialog.sequence.alignChildren = 'fill'
dialog.sequence.stops = dialog.sequence.addHGroup()
dialog.sequence.stops.addText(textBounds, 'Stops at:', 'right')
dialog.sequence.stopsList = dialog.sequence.stops.add('dropdownlist', undefined, ALPHABETS)
dialog.sequence.stopsList.selection = 1
dialog.sequence.space = dialog.sequence.addHGroup()
dialog.sequence.space.addText(textBounds, 'Add space:', 'right')
dialog.sequence.spaceCheck = dialog.sequence.space.addCheckBox()

dialog.reverse = dialog.main.addVGroup()
dialog.reverse.alignment = 'right'
dialog.reverse.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')

var prefix = 1
var count = 0
var stopsAt

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == dialog.sequence.stopsList.selection.text) {
            stopsAt = i + 1
        }
    }
    if (!dialog.reverse.reverseCheck.value) {
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
        if (dialog.sequence.spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]

        item.words.removeAll()
        item.words.add(s)

        count++
        if (count == stopsAt) {
            prefix++
            count = 0
        }
    }
}