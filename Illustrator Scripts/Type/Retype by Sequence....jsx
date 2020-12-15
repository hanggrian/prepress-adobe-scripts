#target Illustrator
#include '../../.rootlib/sui-validator.js'
#include '../.lib/commons.js'
#include '../.lib/sui-affix.js'

checkHasSelection()

createDialog('Retype by Sequence')

var textBounds = [0, 0, 55, 21]
var editBounds = [0, 0, 100, 21]

dialog.sequence = dialog.main.addVPanel('Sequence')
dialog.sequence.startsAt = dialog.sequence.addHGroup()
dialog.sequence.startsAt.addText(textBounds, 'Starts at:', 'right')
dialog.sequence.startsAtEdit = dialog.sequence.startsAt.addEditText(editBounds, '1')
dialog.sequence.startsAtEdit.validateDigits()
dialog.sequence.startsAtEdit.active = true
dialog.sequence.startsAt.setTooltip('Starting counter.')
dialog.sequence.digits = dialog.sequence.addHGroup()
dialog.sequence.digits.addText(textBounds, 'Digits:', 'right')
dialog.sequence.digitsEdit = dialog.sequence.digits.addEditText(editBounds)
dialog.sequence.digitsEdit.validateDigits()
dialog.sequence.digits.setTooltip('Put n number of zeroes.')

dialog.affix = dialog.main.addAffixPanel(textBounds, editBounds)

dialog.reverse = dialog.main.addVGroup()
dialog.reverse.alignment = 'right'
dialog.reverse.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')
dialog.reverse.setTooltip('Iterate items at reverse-order.')

var count, digits, prefix, suffix

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    count = parseInt(dialog.sequence.startsAtEdit.text) || 0
    digits = parseInt(dialog.sequence.digitsEdit.text) || 0
    prefix = dialog.affix.prefixEdit.text
    suffix = dialog.affix.suffixEdit.text
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
        item.words.removeAll()
        item.words.add(prefix + pad(count, digits) + suffix) 
        count++
    }
}

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}