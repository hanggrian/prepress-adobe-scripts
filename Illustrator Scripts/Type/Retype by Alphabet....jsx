#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/affix.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()

var dialog = new Dialog('Retype by Alphabet')

dialog.main.alignChildren = 'fill'

var textBounds = [0, 0, 60, 21]
var editBounds = [0, 0, 100, 21]

dialog.sequence = dialog.main.addVPanel('Alphabet')
dialog.sequence.alignChildren = 'fill'
dialog.sequence.stops = dialog.sequence.addHGroup()
dialog.sequence.stops.addText(textBounds, 'Stops at:', 'right')
dialog.sequence.stopsList = dialog.sequence.stops.add('dropdownlist', undefined, ALPHABETS)
dialog.sequence.stopsList.selection = 1
dialog.sequence.stops.setTooltip('The iteration will stop at the selected alphabet and the number will reset back to 1.')
dialog.sequence.space = dialog.sequence.addHGroup()
dialog.sequence.space.addText(textBounds, 'Midspace:', 'right')
dialog.sequence.spaceCheck = dialog.sequence.space.addCheckBox(undefined, 'Enable')
dialog.sequence.space.setTooltip('Add single space between number and alphabet.')

dialog.affix = new Affix(dialog.main, textBounds, editBounds)

dialog.reverse = dialog.main.addVGroup()
dialog.reverse.alignment = 'right'
dialog.reverse.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')
dialog.reverse.setTooltip('Iterate items at reverse-order.')

var number = 1, count = 0, stopsAt, prefix, suffix

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    prefix = dialog.affix.prefixEdit.text
    suffix = dialog.affix.suffixEdit.text
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
dialog.show()

function rename(item) {
    if (item.typename == 'TextFrame') {
        var s = number.toString()
        if (dialog.sequence.spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]

        item.words.removeAll()
        item.words.add(prefix + s + suffix)

        count++
        if (count == stopsAt) {
            number++
            count = 0
        }
    }
}