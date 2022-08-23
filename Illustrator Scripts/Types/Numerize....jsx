#target Illustrator
#include "../.lib/commons.js"

var ALPHABETS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z"
]
var SIZE_INPUT = [100, 21]

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === "TextFrame" })
check(Collections.isNotEmpty(items), "No types found in selection")

var dialog = new Dialog("Numerize", "retyping-texts/#numerize")
var startsAtEdit, digitsEdit
var stopsAtGroup, stopsAtCheck, stopsAtList
var prefixEdit, suffixEdit
var orderByGroup
var config = configs.resolve("types/numerize")

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Options", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Starting counter")
        group.staticText(undefined, "Starts at:").also(JUSTIFY_RIGHT)
        startsAtEdit = group.editText(SIZE_INPUT, config.getInt("start")).also(function(it) {
          it.validateDigits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips("Put n number of zeroes, can be left empty")
        group.staticText(undefined, "Digits:").also(JUSTIFY_RIGHT)
        digitsEdit = group.editText(SIZE_INPUT, config.getInt("digit")).also(VALIDATE_DIGITS)
      })
      stopsAtGroup = panel.hgroup(function(group) {
        group.alignChildren = "bottom"
        group.tooltips("The iteration will stop at the selected alphabet and the number will reset back to 1, ignore if this behavior is not desired")
        stopsAtCheck = group.checkBox(undefined, "Stops at:").also(function(it) {
          it.value = config.getBoolean("stop_enabled")
          it.onClick = function() {
            stopsAtList.enabled = stopsAtCheck.value
          }
        })
        stopsAtList = group.dropDownList(SIZE_INPUT, ALPHABETS).also(function(it) {
          it.enabled = stopsAtCheck.value
          var s = config.getString("stop_alphabet")
          it.selectText(s !== undefined ? s : "B")
        })
      })
    })
    topGroup.vpanel("Affix", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("Extra text before content, can be left empty")
        group.staticText(undefined, "Prefix:").also(JUSTIFY_RIGHT)
        prefixEdit = group.editText(SIZE_INPUT, config.getString("prefix"))

      })
      panel.hgroup(function(group) {
        group.tooltips("Extra text after content, can be left empty")
        group.staticText(undefined, "Suffix:").also(JUSTIFY_RIGHT)
        suffixEdit = group.editText(SIZE_INPUT, config.getString("suffix"))
      })
    })
  })
  orderByGroup = new OrderByGroup(main, [ORDER_LAYERS, ORDER_POSITIONS]).also(function(group) {
    group.list.selectText(config.getString("order", "Reversed"))
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
    println(i + ". " + s + ".")
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

  config.setInt("start", parseInt(startsAtEdit.text) || 1)
  config.setInt("digit", digits)
  config.setBoolean("stop_enabled", stopsAtCheck.value)
  if (stopsAtList.selection !== null) {
    config.setString("stop_alphabet", stopsAtList.selection.text)
  }
  config.setString("prefix", prefix)
  config.setString("suffix", suffix)
  config.setString("order", orderByGroup.list.selection.text)
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
