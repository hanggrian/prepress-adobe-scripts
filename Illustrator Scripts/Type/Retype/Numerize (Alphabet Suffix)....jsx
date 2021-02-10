#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/type.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()
var items = selection.mapItemNotNull(function(it) {
    return it.typename == 'TextFrame' ? it : null
})
check(items.isNotEmpty(), 'No types found in selection.')

var dialog = new Dialog('Retype Numerize (Alphabet Suffix)')

dialog.main.alignChildren = 'fill'

var textBounds = [0, 0, 80, 21]
var editBounds = [0, 0, 100, 21]

dialog.stops = dialog.main.addHGroup()
dialog.stops.addText(textBounds, 'Stops at:', 'right')
dialog.stopsList = dialog.stops.add('dropdownlist', undefined, ALPHABETS)
dialog.stopsList.selection = 1
dialog.stops.setTooltip('The iteration will stop at the selected alphabet and the number will reset back to 1.')
dialog.space = dialog.main.addHGroup()
dialog.space.addText(textBounds, 'Midspace:', 'right')
dialog.spaceCheck = dialog.space.addCheckBox(undefined, 'Enable')
dialog.space.setTooltip('Add single space between number and alphabet.')
dialog.arrangement = new TypeArrangement(dialog.main, textBounds)

dialog.affix = new TypeAffix(dialog.main, textBounds, editBounds)

var number = 1, count = 0, stopsAt, prefix, suffix

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    prefix = dialog.affix.prefixEdit.text
    suffix = dialog.affix.suffixEdit.text
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] == dialog.stopsList.selection.text) {
            stopsAt = i + 1
        }
    }
    if (!dialog.arrangement.isReverse()) {
        items.forEach(function(it) { retype(it) })
    } else {
        items.forEachReversed(function(it) { retype(it) })
    }
})
dialog.show()

function retype(item) {
    var s = number.toString()
    if (dialog.spaceCheck.value) {
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