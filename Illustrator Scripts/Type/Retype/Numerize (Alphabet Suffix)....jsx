#target Illustrator
#include '../../.lib/commons.js'
#include '../../.lib/ui/checks.js'
#include '../../.lib/ui/type-affix.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]

var ALPHABETS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
]

checkHasSelection()

var items = selection.filterItem(function(it) { return it.typename === 'TextFrame' })
check(items.isNotEmpty(), 'No types found in selection')

var dialog = new Dialog('Retype Numerize (Alphabet Suffix)', 'fill')
var stopsList, spaceCheck
var affixPanel, reverseGroup

dialog.vpanel('Retype', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setHelpTips('The iteration will stop at the selected alphabet and the number will reset back to 1.')
        group.staticText(BOUNDS_TEXT, 'Stops at:', JUSTIFY_RIGHT)
        stopsList = group.dropDownList(undefined, ALPHABETS, function(it) {
            it.selection = ALPHABETS.indexOf('B')
        })
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Add single space between number and alphabet.')
        group.staticText(BOUNDS_TEXT, 'Midspace:', JUSTIFY_RIGHT)
        spaceCheck = group.checkBox(undefined, 'Enable')
    })
})

affixPanel = new TypeAffixPanel(dialog.main, BOUNDS_TEXT, BOUNDS_EDIT)

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
        if (spaceCheck.value) {
            s += ' '
        }
        s += ALPHABETS[count]
    
        item.words.removeAll()
        item.words.add(prefix + s + suffix)
    
        count++
        if (count === stopsAt) {
            number++
            count = 0
        }
    })
})
dialog.show()