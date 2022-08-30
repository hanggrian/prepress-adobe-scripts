#target Illustrator
#include "../.lib/commons.js"

var SIZE_INPUT = [100, 21]

checkHasSelection()

var items = Collections.filterItem(selection, function(it) { return it.typename === "TextFrame" })
check(Collections.isNotEmpty(items), "No types found in selection")

var dialog = new Dialog(R.string.numerize, "retyping-texts/#numerize")
var startsAtEdit, digitsEdit
var stopsAtGroup, stopsAtCheck, stopsAtList
var prefixEdit, suffixEdit
var orderByList
var config = configs.resolve("types/numerize")

dialog.vgroup(function(main) {
  main.alignChildren = "right"
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.options, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_numerize_startsat)
        group.leftStaticText(undefined, R.string.starts_at)
        startsAtEdit = group.editText(SIZE_INPUT, config.getInt("start").toString()).also(function(it) {
          it.validateDigits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_numerize_digits)
        group.leftStaticText(undefined, R.string.digits)
        digitsEdit = group.editText(SIZE_INPUT, config.getInt("digit").toString()).also(VALIDATE_DIGITS)
      })
      stopsAtGroup = panel.hgroup(function(group) {
        group.alignChildren = "bottom"
        group.tooltips(R.string.tip_numerize_stopsat)
        stopsAtCheck = group.checkBox(undefined, getString(R.string.stops_at) + ":").also(function(it) {
          it.justify = "right"
          it.value = config.getBoolean("stop_enabled")
          it.onClick = function() {
            stopsAtList.enabled = stopsAtCheck.value
          }
        })
        stopsAtList = group.dropDownList(SIZE_INPUT, listAlphabets()).also(function(it) {
          it.enabled = stopsAtCheck.value
          it.selection = config.getInt("stop_alphabet")
        })
      })
    })
    topGroup.vpanel(R.string.affix, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_numerize_prefix)
        group.leftStaticText(undefined, R.string.prefix)
        prefixEdit = group.editText(SIZE_INPUT, config.getString("prefix"))
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_numerize_suffix)
        group.leftStaticText(undefined, R.string.suffix)
        suffixEdit = group.editText(SIZE_INPUT, config.getString("suffix"))
      })
    })
  })
  orderByList = new OrderByList(main, [OrderBy.layers(), OrderBy.positions()]).also(function(it) {
    it.selection = config.getInt("order")
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
  orderByList.forEach(items, function(item, i) {
    var s = pad(startsAt, digits)
    if (stopsAtCheck.value) {
      s += stopsAtList.items[stopsCount].text
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
    config.setInt("stop_alphabet", stopsAtList.selection.index)
  }
  config.setString("prefix", prefix)
  config.setString("suffix", suffix)
  config.setInt("order", orderByList.selection.index)
})
dialog.show()

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function listAlphabets() {
  return [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
  ]
}
