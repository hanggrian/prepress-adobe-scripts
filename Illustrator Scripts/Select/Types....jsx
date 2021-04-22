// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select Types')
var characterFontEdit, characterItalicCheck, characterUnderlineCheck
var colorFillList, colorStrokeList

dialog.hgroup(function(mainGroup) {
    mainGroup.alignChildren = 'top'
    mainGroup.vpanel('Character', function(panel) {
        var characterTextBounds = [65, 21]
        panel.alignChildren = 'left'
        panel.hgroup(function(group) {
            group.staticText(characterTextBounds, 'Font size:', JUSTIFY_RIGHT)
            characterFontEdit = group.editText([75, 21], undefined, function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.staticText(characterTextBounds, 'Attributes:', JUSTIFY_RIGHT)
            characterItalicCheck = group.checkBox(undefined, 'Italic')
            characterUnderlineCheck = group.checkBox(undefined, 'Underline') 
        })
    })
    mainGroup.vpanel('Color', function(panel) {
        var colorTextBounds = [45, 21]
        panel.hgroup(function(group) {
            group.staticText(colorTextBounds, 'Fill:', JUSTIFY_RIGHT)
            colorFillList = group.dropDownList(undefined, COLORS)    
        })
        panel.hgroup(function(group) {
            group.staticText(colorTextBounds, 'Stroke:', JUSTIFY_RIGHT)
            colorStrokeList = group.dropDownList(undefined, COLORS)  
        })
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(['TextFrame'], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseUnits(characterFontEdit.text)
        if (fontSize > 0) {
            condition = condition && fontSize === attr.size
        }
        if (characterItalicCheck.value) {
            condition = condition && attr.italics
        }
        if (characterUnderlineCheck.value) {
            condition = condition && attr.underline
        }
        if (colorFillList.selection != null) {
            condition = condition && isColorEqual(attr.fillColor, parseColor(colorFillList.selection.text))
        }
        if (colorStrokeList.selection != null) {
            condition = condition && isColorEqual(attr.strokeColor, parseColor(colorStrokeList.selection.text))
        }
        return condition
    })
})
dialog.show()