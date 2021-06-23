#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [100, 21]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Numerize')
var startsAtEdit, digitsEdit, stopsAtGroup, stopsAtList, prefixEdit, suffixEdit, reverseGroup
var isAlphabetSuffixMode = false

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Options', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Starting counter')
            group.staticText(BOUNDS_TEXT, 'Starts at:', JUSTIFY_RIGHT)
            startsAtEdit = group.editText(BOUNDS_EDIT, '1', function(it) {
                it.validateDigits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.setTooltips('Put n number of zeroes, can be left empty')
            group.staticText(BOUNDS_TEXT, 'Digits:', JUSTIFY_RIGHT)
            digitsEdit = group.editText(BOUNDS_EDIT, undefined, VALIDATE_DIGITS)
        })
        stopsAtGroup = panel.hgroup(function(group) {
            group.setTooltips('The iteration will stop at the selected alphabet and the number will reset back to 1')
            group.staticText(BOUNDS_TEXT, 'Stops at:', JUSTIFY_RIGHT)
            stopsAtList = group.dropDownList(BOUNDS_EDIT, ALPHABETS, function(it) {
                it.selection = ALPHABETS.indexOf('B')
            })
            group.visible = false
        })
    })
    topGroup.vpanel('Affix', function(panel) {
        panel.hgroup(function(group) {
            group.setTooltips('Extra text before content, can be left empty')
            group.staticText(BOUNDS_TEXT, 'Prefix:', JUSTIFY_RIGHT)
            prefixEdit = group.editText(BOUNDS_EDIT)

        })
        panel.hgroup(function(group) {
            group.setTooltips('Extra text after content, can be left empty')
            group.staticText(BOUNDS_TEXT, 'Suffix:', JUSTIFY_RIGHT)
            suffixEdit = group.editText(BOUNDS_EDIT)
        })
    })
})
reverseGroup = new ReverseOrderGroup(dialog.main)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var startsAt = parseInt(startsAtEdit.text) || 0
    var digits = parseInt(digitsEdit.text) || 0
    var stopsAt, stopsCount
    if (isAlphabetSuffixMode) {
        stopsAt = stopsAtList.selection.index + 1
        stopsCount = 0
    }
    var prefix = prefixEdit.text
    var suffix = suffixEdit.text
    reverseGroup.forEachAware(items, function(item) {
        var s = pad(startsAt, digits)
        if (isAlphabetSuffixMode) {
            s += ALPHABETS[stopsCount]
        }

        item.words.removeAll()
        item.words.add(prefix + s + suffix)

        if (isAlphabetSuffixMode) {
            stopsCount++
            if (stopsCount === stopsAt) {
                startsAt++
                stopsCount = 0
            }
        } else {
            startsAt++
        }
    })
    selection = items
})
dialog.setNeutralButton(80, 'Alphabet Suffix Mode', function() {
    isAlphabetSuffixMode = !isAlphabetSuffixMode
    dialog.setTitle(isAlphabetSuffixMode ? 'Numerize (Alphabet Suffix)' : 'Numerize')
    dialog.neutralButton.text = isAlphabetSuffixMode ? 'Default Mode' : 'Alphabet Suffix Mode'
    stopsAtGroup.visible = isAlphabetSuffixMode
    return true
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}