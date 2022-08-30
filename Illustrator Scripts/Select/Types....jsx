// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

function listYesNo() { return [R.string.yes, R.string.no] }
function listKinds() { return [R.string.point_text, R.string.area_text, R.string.path_text] }
function listOrientations() { return [R.string.horizontal, R.string.vertical] }

var SIZE_INPUT_LEFT = [100, 21]
var SIZE_INPUT_RIGHT = [110, 21]

check(Collections.isNotEmpty(document.textFrames), "No texts in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_types, "selecting-items/#select-types")
var findEdit, matchCaseCheck, matchWordCheck
var fontNameEdit, fontSizeEdit, italicList, underlineList
var fillColorList, strokeColorList
var kindList, orientationList
var recursiveCheck
var config = configs.resolve("select/types")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.content, function(panel) {
      panel.alignChildren = "fill"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_content)
        group.leftStaticText(undefined, R.string.find)
        findEdit = group.editText([150, 21]).also(ACTIVATE)
      })
      matchCaseCheck = panel.checkBox(undefined, R.string.match_case)
      matchWordCheck = panel.checkBox(undefined, R.string.match_whole_word)
    })
    topGroup.vpanel(R.string.character, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_fontname)
        group.leftStaticText(undefined, R.string.font_name)
        fontNameEdit = group.editText(SIZE_INPUT_LEFT)
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_fontsize)
        group.leftStaticText(undefined, R.string.font_size)
        fontSizeEdit = group.editText(SIZE_INPUT_LEFT).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_italic)
        group.leftStaticText(undefined, R.string.italic)
        italicList = group.dropDownList(SIZE_INPUT_LEFT, listYesNo())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_underline)
        group.leftStaticText(undefined, R.string.underline)
        underlineList = group.dropDownList(SIZE_INPUT_LEFT, listYesNo())
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.color, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_fill)
        group.leftStaticText(undefined, R.string.fill)
        fillColorList = group.dropDownList(SIZE_INPUT_RIGHT, Colors.list())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_stroke)
        group.leftStaticText(undefined, R.string.stroke)
        strokeColorList = group.dropDownList(SIZE_INPUT_RIGHT, Colors.list())
      })
    })
    topGroup.vpanel(R.string.others, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_kind)
        group.leftStaticText(undefined, R.string.kind)
        kindList = group.dropDownList(SIZE_INPUT_RIGHT, listKinds())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selecttypes_orientation)
        group.leftStaticText(undefined, R.string.orientation)
        orientationList = group.dropDownList(SIZE_INPUT_RIGHT, listOrientations())
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = "right"
        it.value = config.getBoolean("recursive")
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var substring = findEdit.text
  var fontName = fontNameEdit.text
  var fontSize = parseUnits(fontSizeEdit.text)
  var italic = italicList.hasSelection() ? italicList.selection.text === getString(R.string.yes) : undefined
  var underline = underlineList.hasSelection() ? underlineList.selection.text === getString(R.string.yes) : undefined
  var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
  var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
  var kind
  if (kindList.hasSelection()) {
    if (kindList.selection.text === getString(R.string.point_text)) {
      kind = TextType.POINTTEXT
    } else if (kindList.selection.text === getString(R.string.area_text)) {
      kind = TextType.AREATEXT
    } else {
      kind = TextType.PATHTEXT
    }
  }
  var orientation
  if (orientationList.hasSelection()) {
    if (orientationList.selection.text === getString(R.string.horizontal)) {
      orientation = TextOrientation.HORIZONTAL
    } else {
      orientation = TextOrientation.VERTICAL
    }
  }
  selectAll(["TextFrame"], function(item) {
    if (substring.isNotEmpty()) {
      var string = item.contents
      if (!matchCaseCheck.value) {
        string = string.toLowerCase()
        substring = substring.toLowerCase()
      }
      if (!find(string, substring)) return false
    }
    var attr = item.textRange.characterAttributes
    if (fontName.isNotEmpty() && !attr.textFont.name.toLowerCase().includes(fontName.toLowerCase())) return false
    if (fontSize !== undefined && parseInt(fontSize) !== parseInt(attr.size)) return false
    if (italic !== undefined && italic !== attr.italics) return false
    if (underline !== undefined && underline !== attr.underline) return false
    if (fillColor !== undefined && !isColorEqual(attr.fillColor, fillColor)) return false
    if (strokeColor !== undefined && !isColorEqual(attr.strokeColor, strokeColor)) return false
    if (kind !== undefined && kind !== item.kind) return false
    if (orientation !== undefined && orientation !== item.orientation) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()

function find(string, substring) {
  if (!matchWordCheck.value) {
    return string.includes(substring)
  } else {
    // https://stackoverflow.com/questions/18740664/search-whole-word-in-string
    substring = substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    return string.match(new RegExp("\\b" + substring + "\\b", "i")) !== null
  }
}
