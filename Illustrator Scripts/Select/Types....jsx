// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

var YES_OR_NO = ["Yes", "No"]
var KINDS = ["Point Text", "Area Text", "Path Text"]
var ORIENTATIONS = ["Horizontal", "Vertical"]

var BOUNDS_LEFT_TEXT = [80, 21]
var BOUNDS_LEFT_EDIT = [100, 21]
var BOUNDS_RIGHT_TEXT = [70, 21]
var BOUNDS_RIGHT_EDIT = [110, 21]

check(Collections.isNotEmpty(document.textFrames), "No texts in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog("Select Types", "selecting-items/#select-types")
var findEdit, matchCaseCheck, matchWordCheck
var fontNameEdit, fontSizeEdit, italicList, underlineList
var fillColorList, strokeColorList
var kindList, orientationList
var recursiveCheck
var prefs = preferences2.resolve("select/types")

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
      panel.alignChildren = "fill"
      panel.hgroup(function(group) {
        group.tooltips("The font's full name")
        group.staticText(BOUNDS_LEFT_TEXT, "Font name:").also(JUSTIFY_RIGHT)
        fontNameEdit = group.editText(BOUNDS_LEFT_EDIT)
      })
      panel.hgroup(function(group) {
        group.tooltips("Font size in points")
        group.staticText(BOUNDS_LEFT_TEXT, "Font size:").also(JUSTIFY_RIGHT)
        fontSizeEdit = group.editText(BOUNDS_LEFT_EDIT).also(VALIDATE_UNITS)
      })
      panel.hgroup(function(group) {
        group.tooltips("Does the Japanese OpenType support italics?")
        group.staticText(BOUNDS_LEFT_TEXT, "Italic:").also(JUSTIFY_RIGHT)
        italicList = group.dropDownList(BOUNDS_LEFT_EDIT, YES_OR_NO)
      })
      panel.hgroup(function(group) {
        group.tooltips("Whether to underline the text")
        group.staticText(BOUNDS_LEFT_TEXT, "Underline:").also(JUSTIFY_RIGHT)
        underlineList = group.dropDownList(BOUNDS_LEFT_EDIT, YES_OR_NO)
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel("Color", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("The color of the text fill")
        group.staticText(BOUNDS_RIGHT_TEXT, "Fill:").also(JUSTIFY_RIGHT)
        fillColorList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
      })
      panel.hgroup(function(group) {
        group.tooltips("The color of the text stroke")
        group.staticText(BOUNDS_RIGHT_TEXT, "Stroke:").also(JUSTIFY_RIGHT)
        strokeColorList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
      })
    })
    topGroup.vpanel("Others", function(panel) {
      panel.hgroup(function(group) {
        group.tooltips("The type of a text frame item")
        group.staticText(BOUNDS_RIGHT_TEXT, "Kind:").also(JUSTIFY_RIGHT)
        kindList = group.dropDownList(BOUNDS_RIGHT_EDIT, KINDS)
      })
      panel.hgroup(function(group) {
        group.tooltips("The orientation of the text in the frame")
        group.staticText(BOUNDS_RIGHT_TEXT, "Orientation:").also(JUSTIFY_RIGHT)
        orientationList = group.dropDownList(BOUNDS_RIGHT_EDIT, ORIENTATIONS)
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.main.alignment = "right"
        it.main.value = prefs.getBoolean("recursive")
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
  }, isFilterMode && recursiveCheck.isSelected())

  prefs.setBoolean("recursive", recursiveCheck.isSelected())
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
