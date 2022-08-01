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
var startsAtEdit, digitsEdit
var stopsAtGroup, stopsAtCheck, stopsAtList
var prefixEdit, suffixEdit
var orderByGroup
var prefs = preferences2.resolve('types/numerize')

dialog.vgroup(function(main) {
  main.alignChildren = 'right'
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Options', function(panel) {
      panel.alignChildren = 'fill'
      panel.hgroup(function(group) {
        group.tips('Starting counter')
        group.staticText(BOUNDS_TEXT, 'Starts at:').also(JUSTIFY_RIGHT)
        startsAtEdit = group.editText(BOUNDS_EDIT, prefs.getInt('start')).also(function(it) {
          it.validateDigits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tips('Put n number of zeroes, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Digits:').also(JUSTIFY_RIGHT)
        digitsEdit = group.editText(BOUNDS_EDIT, prefs.getInt('digit')).also(VALIDATE_DIGITS)
      })
      stopsAtGroup = panel.hgroup(function(group) {
        group.alignChildren = 'bottom'
        group.tips('The iteration will stop at the selected alphabet and the number will reset back to 1, ignore if this behavior is not desired')
        group.staticText(BOUNDS_TEXT, 'Stops at:').also(JUSTIFY_RIGHT)
        stopsAtCheck = group.checkBox(undefined).also(function(it) {
          it.value = prefs.getBoolean('stop_enabled')
          it.onClick = function() {
            stopsAtList.enabled = stopsAtCheck.value
          }
        })
        stopsAtList = group.dropDownList(undefined, ALPHABETS).also(function(it) {
          it.enabled = stopsAtCheck.value
          var s = prefs.getString('stop_alphabet')
          it.selectText(s !== undefined ? s : 'B')
        })
      })
    })
    topGroup.vpanel('Affix', function(panel) {
      panel.hgroup(function(group) {
        group.tips('Extra text before content, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Prefix:').also(JUSTIFY_RIGHT)
        prefixEdit = group.editText(BOUNDS_EDIT, prefs.getString('prefix'))

      })
      panel.hgroup(function(group) {
        group.tips('Extra text after content, can be left empty')
        group.staticText(BOUNDS_TEXT, 'Suffix:').also(JUSTIFY_RIGHT)
        suffixEdit = group.editText(BOUNDS_EDIT, prefs.getString('suffix'))
      })
    })
  })
  orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
    group.list.selectText(prefs.getString('order', 'Reversed'))
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var startsAt = parseInt(startsAtEdit.text) || 1
  var digits = parseInt(digitsEdit.text) || 0
  var stopsAt, stopsCount
  if (stopsAtCheck.value) {
    stopsAt = stopsAtList.selection.index + 1
    stopsCount = 0
  }
  var prefix = prefixEdit.text
  var suffix = suffixEdit.text
  orderByGroup.forEach(items, function(item, i) {
    var s = pad(startsAt, digits)
    if (stopsAtCheck.value) {
      s += ALPHABETS[stopsCount]
    }

    s = prefix + s + suffix
    println(i + '. ' + s)
    item.contents = s

    if (stopsAtCheck.value) {
      stopsCount++
      if (stopsCount === stopsAt) {
        startsAt++
        stopsCount = 0
      }
    } else {
      startsAt++
    }
  })

  prefs.setInt('start', parseInt(startsAtEdit.text) || 1)
  prefs.setInt('digit', digits)
  prefs.setBoolean('stop_enabled', stopsAtCheck.value)
  if (stopsAtList.selection !== null) {
    prefs.setString('stop_alphabet', stopsAtList.selection.text)
  }
  prefs.setString('prefix', prefix)
  prefs.setString('suffix', suffix)
  prefs.setString('order', orderByGroup.list.selection.text)
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
