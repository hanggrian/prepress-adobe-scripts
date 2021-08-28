// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var YES_OR_NO = ['Yes', 'No']
var KINDS = ['Point Text', 'Area Text', 'Path Text']
var ORIENTATIONS = ['Horizontal', 'Vertical']

var BOUNDS_LEFT_TEXT = [80, 21]
var BOUNDS_LEFT_EDIT = [100, 21]
var BOUNDS_RIGHT_TEXT = [70, 21]
var BOUNDS_RIGHT_EDIT = [110, 21]

var dialog = new Dialog('Select Types')
var findEdit, matchCaseCheck, matchWordCheck
var fontNameEdit, fontSizeEdit, italicList, underlineList
var fillColorList, strokeColorList
var kindList, orientationList

dialog.hgroup(function(main) {
    main.alignChildren = 'fill'
    main.vgroup(function(midGroup) {
        midGroup.alignChildren = 'fill'
        midGroup.vpanel('Content', function(panel) {
            panel.alignChildren = 'fill'
            panel.hgroup(function(group) {
                group.tips('Text to find in content')
                group.staticText(undefined, 'Find:').also(JUSTIFY_RIGHT)
                findEdit = group.editText([150, 21]).also(ACTIVATE)
            })
            panel.hgroup(function(group) {
                matchCaseCheck = group.checkBox(undefined, 'Match Case')
                matchWordCheck = group.checkBox(undefined, 'Match Whole Word')
            })
        })
        midGroup.vpanel('Character', function(panel) {
            panel.alignChildren = 'fill'
            panel.hgroup(function(group) {
                group.tips("The font's full name")
                group.staticText(BOUNDS_LEFT_TEXT, 'Font name:').also(JUSTIFY_RIGHT)
                fontNameEdit = group.editText(BOUNDS_LEFT_EDIT)
            })
            panel.hgroup(function(group) {
                group.tips('Font size in points')
                group.staticText(BOUNDS_LEFT_TEXT, 'Font size:').also(JUSTIFY_RIGHT)
                fontSizeEdit = group.editText(BOUNDS_LEFT_EDIT).also(VALIDATE_UNITS)
            })
            panel.hgroup(function(group) {
                group.tips('Does the Japanese OpenType support italics?')
                group.staticText(BOUNDS_LEFT_TEXT, 'Italic:').also(JUSTIFY_RIGHT)
                italicList = group.dropDownList(BOUNDS_LEFT_EDIT, YES_OR_NO)
            })
            panel.hgroup(function(group) {
                group.tips('Whether to underline the text')
                group.staticText(BOUNDS_LEFT_TEXT, 'Underline:').also(JUSTIFY_RIGHT)
                underlineList = group.dropDownList(BOUNDS_LEFT_EDIT, YES_OR_NO)
            })
        })
    })
    main.vgroup(function(midGroup) {
        midGroup.alignChildren = 'fill'
        midGroup.vpanel('Color', function(panel) {
            panel.hgroup(function(group) {
                group.tips('The color of the text fill')
                group.staticText(BOUNDS_RIGHT_TEXT, 'Fill:').also(JUSTIFY_RIGHT)
                fillColorList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
            })
            panel.hgroup(function(group) {
                group.tips('The color of the text stroke')
                group.staticText(BOUNDS_RIGHT_TEXT, 'Stroke:').also(JUSTIFY_RIGHT)
                strokeColorList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
            })
        })
        midGroup.vpanel('Others', function(panel) {
            panel.hgroup(function(group) {
                group.tips('The type of a text frame item')
                group.staticText(BOUNDS_RIGHT_TEXT, 'Kind:').also(JUSTIFY_RIGHT)
                kindList = group.dropDownList(BOUNDS_RIGHT_EDIT, KINDS)
            })
            panel.hgroup(function(group) {
                group.tips('The orientation of the text in the frame')
                group.staticText(BOUNDS_RIGHT_TEXT, 'Orientation:').also(JUSTIFY_RIGHT)
                orientationList = group.dropDownList(BOUNDS_RIGHT_EDIT, ORIENTATIONS)
            })
        })
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var substring = findEdit.text
    var fontName = fontNameEdit.text
    var fontSize = parseUnits(fontSizeEdit.text)
    var italic = italicList.hasSelection() ? italicList.selection.text === 'Yes' : undefined
    var underline = underlineList.hasSelection() ? underlineList.selection.text === 'Yes' : undefined
    var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
    var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
    var kind
    if (kindList.hasSelection()) {
        if (kindList.selection.text === 'Point Text') {
            kind = TextType.POINTTEXT
        } else if (kindList.selection.text === 'Area Text') {
            kind = TextType.AREATEXT
        } else {
            kind = TextType.PATHTEXT
        }
    }
    var orientation
    if (orientationList.hasSelection()) {
        if (orientationList.selection.text === 'Horizontal') {
            orientation = TextOrientation.HORIZONTAL
        } else {
            orientation = TextOrientation.VERTICAL
        }
    }
    selectAll(['TextFrame'], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        if (substring.isNotEmpty()) {
            var string = item.contents
            if (!matchCaseCheck.value) {
                string = string.toLowerCase()
                substring = substring.toLowerCase()
            }
            condition = condition && find(string, substring)
        }
        if (fontName.isNotEmpty()) {
            condition = condition && attr.textFont.name.toLowerCase().includes(fontName.toLowerCase())
        }
        if (fontSize !== undefined) {
            condition = condition && parseInt(fontSize) === parseInt(attr.size)
        }
        if (italic !== undefined) {
            condition = condition && italic === attr.italics
        }
        if (underline !== undefined) {
            condition = condition && underline === attr.underline
        }
        if (fillColor !== undefined) {
            condition = condition && isColorEqual(attr.fillColor, fillColor)
        }
        if (strokeColor !== undefined) {
            condition = condition && isColorEqual(attr.strokeColor, strokeColor)
        }
        if (kind !== undefined) {
            condition = condition && kind === item.kind
        }
        if (orientation !== undefined) {
            condition = condition && orientation === item.orientation
        }
        return condition
    })
})
dialog.setHelpButton(undefined, showSelectHelp)
dialog.show()

function find(string, substring) {
    if (!matchWordCheck.value) {
        return string.includes(substring)
    } else {
        // https://stackoverflow.com/questions/18740664/search-whole-word-in-string
        substring = substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        return string.match(new RegExp('\\b' + substring + '\\b', 'i')) !== null
    }
}