#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/type.js'

checkHasSelection()

var dialog = new Dialog('Retype Numerize')
var items = selection.mapItemNotNull(function(it) {
    return it.typename == 'TextFrame' ? it : null
})
check(items.isNotEmpty(), 'No types found in selection.')

var textBounds = [0, 0, 80, 21]
var editBounds = [0, 0, 100, 21]

dialog.startsAt = dialog.main.addHGroup()
dialog.startsAt.addText(textBounds, 'Starts at:', 'right')
dialog.startsAtEdit = dialog.startsAt.addEditText(editBounds, '1')
dialog.startsAtEdit.validateDigits()
dialog.startsAtEdit.active = true
dialog.startsAt.setTooltip('Starting counter.')
dialog.digits = dialog.main.addHGroup()
dialog.digits.addText(textBounds, 'Digits:', 'right')
dialog.digitsEdit = dialog.digits.addEditText(editBounds)
dialog.digitsEdit.validateDigits()
dialog.digits.setTooltip('Put n number of zeroes.')
dialog.arrangement = new TypeArrangement(dialog.main, textBounds)

dialog.affix = new TypeAffix(dialog.main, textBounds, editBounds)

var count, digits, prefix, suffix

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    count = parseInt(dialog.startsAtEdit.text) || 0
    digits = parseInt(dialog.digitsEdit.text) || 0
    prefix = dialog.affix.prefixEdit.text
    suffix = dialog.affix.suffixEdit.text
    if (!dialog.arrangement.isReverse()) {
        items.forEach(function(it) { retype(it) })
    } else {
        items.forEachReversed(function(it) { retype(it) })
    }
})
dialog.show()

function retype(item) {
    item.words.removeAll()
    item.words.add(prefix + pad(count, digits) + suffix) 
    count++
}

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}