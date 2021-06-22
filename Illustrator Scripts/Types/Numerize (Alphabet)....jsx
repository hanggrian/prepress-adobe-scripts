#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/ui/checks.js'
#include '../.lib/ui/retype-affix.js'

var BOUNDS_TEXT = [60, 21]
var BOUNDS_EDIT = [100, 21]

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Numerize (Alphabet)', 'fill')
var stopsList, affixPanel, reverseGroup

dialog.vpanel('Options', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setTooltips('The iteration will stop at the selected alphabet and the number will reset back to 1')
        group.staticText(BOUNDS_TEXT, 'Stops at:', JUSTIFY_RIGHT)
        stopsList = group.dropDownList(BOUNDS_EDIT, ALPHABETS, function(it) {
            it.selection = ALPHABETS.indexOf('B')
        })
    })
})
affixPanel = new RetypeAffixPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)
reverseGroup = new ReverseOrderGroup(dialog.main)

var number = 1, count = 0, stopsAt, prefix, suffix

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    prefix = affixPanel.getPrefix()
    suffix = affixPanel.getSuffix()
    for (var i = 0; i < ALPHABETS.length; i++) {
        if (ALPHABETS[i] === stopsList.selection.text) {
            stopsAt = i + 1
        }
    }
    reverseGroup.forEachAware(items, function(item) {
        var s = number.toString()
        s += ALPHABETS[count]

        item.words.removeAll()
        item.words.add(prefix + s + suffix)

        count++
        if (count === stopsAt) {
            number++
            count = 0
        }
    })
    selection = items
})
dialog.show()