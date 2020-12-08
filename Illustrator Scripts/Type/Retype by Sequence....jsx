#target Illustrator
#include '../../.sharedlib/sui-validator.js'
#include '../.lib/commons.js'

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
dialog.sequence.digits = dialog.sequence.addHGroup()
dialog.sequence.digits.addText(textBounds, 'Digits:', 'right')
dialog.sequence.digitsEdit = dialog.sequence.digits.addEditText(editBounds)
dialog.sequence.digitsEdit.validateDigits()

dialog.affix = dialog.main.addVPanel('Affix')
dialog.affix.prefix = dialog.affix.addHGroup()
dialog.affix.prefix.addText(textBounds, 'Prefix:', 'right')
dialog.affix.prefixEdit = dialog.affix.prefix.addEditText(editBounds)
dialog.affix.suffix = dialog.affix.addHGroup()
dialog.affix.suffix.addText(textBounds, 'Suffix:', 'right')
dialog.affix.suffixEdit = dialog.affix.suffix.addEditText(editBounds)

dialog.reverse = dialog.main.addVGroup()
dialog.reverse.alignment = 'right'
dialog.reverse.reverseCheck = dialog.reverse.addCheckBox(undefined, 'Reverse order')

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