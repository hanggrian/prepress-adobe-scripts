#target Illustrator
#include '../.lib/commons.js'

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

var dialog = new Dialog('Numerize', 'retyping-texts#numerize--f6')
var startsAtEdit, digitsEdit, stopsAtGroup
var stopsAtList, prefixEdit, suffixEdit
var orderByGroup

dialog.vgroup(function(main) {
  main.alignChildren = 'right'
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Options', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Starting counter')
        group.staticText(BOUNDS_TEXT, 'Starts at:').also(JUSTIFY_RIGHT)
        startsAtEdit = group.editText(BOUNDS_EDIT, '1').also(function(it) {
          it.validateDigits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tips('Put n number of zeroes, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Digits:').also(JUSTIFY_RIGHT)
        digitsEdit = group.editText(BOUNDS_EDIT).also(VALIDATE_DIGITS)
      })
      stopsAtGroup = panel.hgroup(function(group) {
        group.tips('The iteration will stop at the selected alphabet and the number will reset back to 1, ignore if this behavior is not desired')
        group.staticText(BOUNDS_TEXT, 'Stops at:').also(JUSTIFY_RIGHT)
        stopsAtList = group.dropDownList(BOUNDS_EDIT, ALPHABETS)
      })
    })
    topGroup.vpanel('Affix', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Extra text before content, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Prefix:').also(JUSTIFY_RIGHT)
        prefixEdit = group.editText(BOUNDS_EDIT)

      })
      panel.hgroup(function(group) {
        group.tips('Extra text after content, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Suffix:').also(JUSTIFY_RIGHT)
        suffixEdit = group.editText(BOUNDS_EDIT)
      })
    })
  })
  orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
    group.list.selectText('Reversed')
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var startsAt = parseInt(startsAtEdit.text) || 0
  var digits = parseInt(digitsEdit.text) || 0
  var stopsAt, stopsCount
  if (stopsAtList.selection !== null) {
    stopsAt = stopsAtList.selection.index + 1
    stopsCount = 0
  }
  var prefix = prefixEdit.text
  var suffix = suffixEdit.text
  orderByGroup.forEach(items, function(item, i) {
    var s = pad(startsAt, digits)
    if (stopsAtList.selection !== null) {
      s += ALPHABETS[stopsCount]
    }

    s = prefix + s + suffix
    println(i + '. ' + s)
    item.contents = s

    if (stopsAtList.selection !== null) {
      stopsCount++
      if (stopsCount === stopsAt) {
        startsAt++
        stopsCount = 0
      }
    } else {
      startsAt++
    }
  })
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
