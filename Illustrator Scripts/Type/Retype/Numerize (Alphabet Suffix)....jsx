#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/type-affix.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()
var items = selection.filterItem(function(it) { return it.typename == 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype Numerize (Alphabet Suffix)', 'fill')

var textBounds = [0, 0, 70, 21]
var editBounds = [0, 0, 100, 21]

dialog.retype = dialog.main.addVPanel('Retype', 'fill')
dialog.stops = dialog.retype.addHGroup()
dialog.stops.addText(textBounds, 'Stops at:', 'right')
dialog.stopsList = dialog.stops.add('dropdownlist', undefined, ALPHABETS)
dialog.stopsList.selection = 1
dialog.stops.setTooltip('The iteration will stop at the selected alphabet and the number will reset back to 1.')
dialog.space = dialog.retype.addHGroup()
dialog.space.addText(textBounds, 'Midspace:', 'right')
dialog.spaceCheck = dialog.space.addCheckBox(undefined, 'Enable')
dialog.space.setTooltip('Add single space between number and alphabet.')

dialog.affix = new TypeAffixPanel(dialog.main, textBounds, editBounds)

dialog.reverse = dialog.main.addVGroup()
dialog.reverse.alignment = 'right'
dialog.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')
dialog.reverse.setTooltip('Iterate items at reverse order.')

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
    var func = function(item) {
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
    if (!dialog.reverseCheck.value) {
        items.forEach(func)
    } else {
        items.forEachReversed(func)
    }
})
dialog.show()