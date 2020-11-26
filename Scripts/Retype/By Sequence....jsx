#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui-validator.js'

var BOUNDS_TEXT = [0, 0, 55, 21]
var BOUNDS_EDIT = [0, 0, 100, 21]

checkHasSelection()

createDialog('Retype by Sequence')

var sequence = dialog.main.addVPanel('Sequence')
sequence.startsAt = sequence.addHGroup()
sequence.startsAt.add('statictext', BOUNDS_TEXT, 'Starts at:').justify = 'right'
sequence.startsAtEdit = sequence.startsAt.add('edittext', BOUNDS_EDIT, '1')
sequence.startsAtEdit.validateDigits()
sequence.startsAtEdit.active = true
sequence.digits = sequence.addHGroup()
sequence.digits.add('statictext', BOUNDS_TEXT, 'Digits:').justify = 'right'
sequence.digitsEdit = sequence.digits.add('edittext', BOUNDS_EDIT)
sequence.digitsEdit.validateDigits()

var affix = dialog.main.addVPanel('Affix')
affix.prefix = affix.addHGroup()
affix.prefix.add('statictext', BOUNDS_TEXT, 'Prefix:').justify = 'right'
affix.prefixEdit = affix.prefix.add('edittext', BOUNDS_EDIT)
affix.suffix = affix.addHGroup()
affix.suffix.add('statictext', BOUNDS_TEXT, 'Suffix:').justify = 'right'
affix.suffixEdit = affix.suffix.add('edittext', BOUNDS_EDIT)

var reverse = dialog.main.addVGroup()
reverse.alignment = 'right'
reverse.reverseCheck = reverse.add('checkbox', undefined, 'Reverse order')

var count, digits, prefix, suffix

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    count = parseInt(sequence.startsAtEdit.text) || 0
    digits = parseInt(sequence.digitsEdit.text) || 0
    prefix = affix.prefixEdit.text
    suffix = affix.suffixEdit.text
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