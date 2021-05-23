// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var KINDS = ['Point Text', 'Area Text', 'Path Text']
var ORIENTATIONS = ['Horizontal', 'Vertical']

var BOUNDS_LEFT_TEXT = [65, 21]
var BOUNDS_LEFT_EDIT = [100, 21]
var BOUNDS_RIGHT_TEXT = [70, 21]
var BOUNDS_RIGHT_EDIT = [100, 21]

var dialog = new Dialog('Select Types', 'fill')
var findEdit, matchCaseCheck, matchWordCheck
var fontFamilyEdit, fontStyleEdit, fontSizeEdit, italicCheck, underlineCheck
var fillList, strokeList
var kindList, orientationList

dialog.main.orientation = 'row'
dialog.vgroup(function(mainGroup) {
    mainGroup.alignChildren = 'fill'
    mainGroup.vpanel('Content', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.staticText(undefined, 'Find:', JUSTIFY_RIGHT)
            findEdit = group.editText([200, 21], undefined, ACTIVATE)
        })
        matchCaseCheck = panel.checkBox(undefined, 'Match Case')
        matchWordCheck = panel.checkBox(undefined, 'Match Whole Word')
    })
    mainGroup.vpanel('Character', function(panel) {
        panel.alignChildren = 'fill'
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Font:', JUSTIFY_RIGHT)
            fontFamilyEdit = group.editText(BOUNDS_LEFT_EDIT)
            group.staticText(undefined, '-')
            fontStyleEdit = group.editText([75, 21])
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Font size:', JUSTIFY_RIGHT)
            fontSizeEdit = group.editText(BOUNDS_LEFT_EDIT, undefined, VALIDATE_UNITS)
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_LEFT_TEXT, 'Attributes:', JUSTIFY_RIGHT)
            italicCheck = group.checkBox(undefined, 'Italic')
            underlineCheck = group.checkBox(undefined, 'Underline')
        })
    })
})
dialog.vgroup(function(mainGroup) {
    mainGroup.alignChildren = 'fill'
    mainGroup.vpanel('Color', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RIGHT_TEXT, 'Fill:', JUSTIFY_RIGHT)
            fillList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RIGHT_TEXT, 'Stroke:', JUSTIFY_RIGHT)
            strokeList = group.dropDownList(BOUNDS_RIGHT_EDIT, COLORS)
        })
    })
    mainGroup.vpanel('Properties', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RIGHT_TEXT, 'Kind:', JUSTIFY_RIGHT)
            kindList = group.dropDownList(BOUNDS_RIGHT_EDIT, KINDS)
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_RIGHT_TEXT, 'Orientation:', JUSTIFY_RIGHT)
            orientationList = group.dropDownList(BOUNDS_RIGHT_EDIT, ORIENTATIONS)
        })
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var substring = findEdit.text
    var fontFamily = fontFamilyEdit.text
    var fontStyle = fontStyleEdit.text
    var fontSize = fontSizeEdit.text
    var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
    var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
    var kind = kindList.hasSelection() ? kindList.selection.text : undefined
    var orientation = orientationList.hasSelection() ? orientationList.selection.text : undefined
    selectAll(['TextFrame'], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        if (substring !== '') {
            var string = item.contents
            if (!matchCaseCheck.value) {
                string = string.toLowerCase()
                substring = substring.toLowerCase()
            }
            condition = condition && find(string, substring)
        }
        if (fontFamily !== '') {
            condition = condition && attr.textFont.family.toLowerCase().includes(fontFamily.toLowerCase())
        }
        if (fontStyle !== '') {
            condition = condition && attr.textFont.fontStyle.toLowerCase().includes(fontStyle.toLowerCase())
        }
        if (fontSize > 0) {
            condition = condition && parseInt(fontSize) === parseInt(attr.size)
        }
        if (italicCheck.value) {
            condition = condition && attr.italics
        }
        if (underlineCheck.value) {
            condition = condition && attr.underline
        }
        if (fillColor !== undefined) {
            condition = condition && isColorEqual(attr.fillColor, fillColor)
        }
        if (strokeColor !== undefined) {
            condition = condition && isColorEqual(attr.strokeColor, strokeColor)
        }
        if (kind !== undefined) {
            var textType
            if (kind === 'Point Text') {
                textType = TextType.POINTTEXT
            } else if (kind === 'Area Text') {
                textType = TextType.AREATEXT
            } else {
                textType = TextType.PATHTEXT
            }
            condition = condition && textType === item.kind
        }
        if (orientation !== undefined) {
            var textOrientation = orientation === 'Horizontal'
                ? TextOrientation.HORIZONTAL
                : TextOrientation.VERTICAL
            condition = condition && textOrientation === item.orientation
        }
        return condition
    })
})
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