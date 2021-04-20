#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/reverse-order.js'
#include '../../.lib/ui/type-affix.js'

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename == 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype Numerize')
var startsAtEdit, digitsEdit
var affixPanel, reverseGroup

var textBounds = [0, 0, 55, 21]
var editBounds = [0, 0, 100, 21]

dialog.vpanel('Retype', function(panel) {
    panel.hgroup(function(group) {
        group.setHelpTips('Starting counter.')
        group.staticText(textBounds, 'Starts at:', JUSTIFY_RIGHT)
        startsAtEdit = group.editText(editBounds, '1', function(it) {
            it.validateDigits()
            it.active = true
        })
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Put n number of zeroes, can be left empty.')
        group.staticText(textBounds, 'Digits:', JUSTIFY_RIGHT)
        digitsEdit = group.editText(editBounds, undefined, VALIDATE_DIGITS)
    })
})

affixPanel = new TypeAffixPanel(dialog.main, textBounds, editBounds)

reverseGroup = new ReverseOrderGroup(dialog.main)

var count, digits, prefix, suffix

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    count = parseInt(startsAtEdit.text) || 0
    digits = parseInt(digitsEdit.text) || 0
    prefix = affixPanel.getPrefix()
    suffix = affixPanel.getSuffix()
    reverseGroup.forEachAware(items, function(item) {
        item.words.removeAll()
        item.words.add(prefix + pad(count, digits) + suffix) 
        count++
    })
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}