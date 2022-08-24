// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

var YES_OR_NO = ["Yes", "No"]
var KINDS = ["Point Text", "Area Text", "Path Text"]
var ORIENTATIONS = ["Horizontal", "Vertical"]
var SIZE_INPUT_LEFT = [100, 21]
var SIZE_INPUT_RIGHT = [110, 21]

check(Collections.isNotEmpty(document.textFrames), "No texts in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Types", "selecting-items/#select-types")
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
    topGroup.vpanel("Content", function(panel) {
      panel.alignChildren = "fill"
      panel.hgroup(function(group) {
        group.tooltips("Text to find in content")
        group.staticText(undefined, "Find:").also(JUSTIFY_RIGHT)
        findEdit = group.editText([150, 21]).also(ACTIVATE)
      })
      panel.hgroup(function(group) {
        matchCaseCheck = group.checkBox(undefined, "Match Case")
        matchWordCheck = group.checkBox(undefined, "Match Whole Word")
      })
    })
    topGroup.vpanel("Character", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("The font's full name")
        group.staticText(undefined, "Font name:").also(JUSTIFY_RIGHT)
        fontNameEdit = group.editText(SIZE_INPUT_LEFT)
      })
      panel.hgroup(function(group) {
        group.tooltips("Font size in points")
        group.staticText(undefined, "Font size:").also(JUSTIFY_RIGHT)
        fontSizeEdit = group.editText(SIZE_INPUT_LEFT).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Does the Japanese OpenType support italics?")
        group.staticText(undefined, "Italic:").also(JUSTIFY_RIGHT)
        italicList = group.dropDownList(SIZE_INPUT_LEFT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Whether to underline the text")
        group.staticText(undefined, "Underline:").also(JUSTIFY_RIGHT)
        underlineList = group.dropDownList(SIZE_INPUT_LEFT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Color", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("The color of the text fill")
        group.staticText(undefined, "Fill:").also(JUSTIFY_RIGHT)
        fillColorList = group.dropDownList(SIZE_INPUT_RIGHT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("The color of the text stroke")
        group.staticText(undefined, "Stroke:").also(JUSTIFY_RIGHT)
        strokeColorList = group.dropDownList(SIZE_INPUT_RIGHT, COLORS)
      })
    })
    topGroup.vpanel("Others", function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips("The type of a text frame item")
        group.staticText(undefined, "Kind:").also(JUSTIFY_RIGHT)
        kindList = group.dropDownList(SIZE_INPUT_RIGHT, KINDS)
      })
      panel.hgroup(function(group) {
        group.tooltips("The orientation of the text in the frame")
        group.staticText(undefined, "Orientation:").also(JUSTIFY_RIGHT)
        orientationList = group.dropDownList(SIZE_INPUT_RIGHT, ORIENTATIONS)
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
  var italic = italicList.hasSelection() ? italicList.selection.text === "Yes" : undefined
  var underline = underlineList.hasSelection() ? underlineList.selection.text === "Yes" : undefined
  var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
  var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
  var kind
  if (kindList.hasSelection()) {
    if (kindList.selection.text === "Point Text") {
      kind = TextType.POINTTEXT
    } else if (kindList.selection.text === "Area Text") {
      kind = TextType.AREATEXT
    } else {
      kind = TextType.PATHTEXT
    }
  }
  var orientation
  if (orientationList.hasSelection()) {
    if (orientationList.selection.text === "Horizontal") {
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
