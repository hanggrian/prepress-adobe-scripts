/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/ui-validator.js'
#include '../.lib/core-all.js'

const BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

init('Select texts')
root.horizontal()
root.alignChildren = 'top'

root.character = root.addVPanel('Character')
root.character.alignChildren = 'left'
root.character.font = root.character.addHGroup()
root.character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
var fontEdit = root.character.font.add('edittext', [0, 0, 75, 21])
fontEdit.validateUnits()
fontEdit.active = true
root.character.attrs = root.character.addHGroup()
root.character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
var italicCheck = root.character.attrs.add('checkbox', undefined, 'Italic')
var underlineCheck = root.character.attrs.add('checkbox', undefined, 'Underline')

root.color = root.addVPanel('Color')
root.color.fill = root.color.addHGroup()
root.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = root.color.fill.add('dropdownlist', undefined, COLORS)
root.color.stroke = root.color.addHGroup()
root.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = root.color.stroke.add('dropdownlist', undefined, COLORS)

addAction('Cancel')
addAction('OK', function() {
    selectItems([SELECT_TEXT_FRAME], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseInt(fontEdit.text) || 0
        if (fontSize > 0) condition = condition && fontSize == attr.size
        if (italicCheck.value) condition = condition && attr.italics
        if (underlineCheck.value) condition = condition && attr.underline
        if (fillList.selection != null) condition = condition && attr.fillColor.equalTo(parseColor(fillList.selection.text))
        if (strokeList.selection != null) condition = condition && attr.strokeColor.equalTo(parseColor(strokeList.selection.text))
        return condition
    })
})
show()