/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/ui-validator.js'
#include '../.lib/core-colors.js'
#include '../.lib/core-select.js'
#include '../.lib/core-units.js'

var BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]
var BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

allowSelectionType(SELECT_TEXT_FRAME)

init('Select Texts')

var main = root.addHGroup()
main.alignChildren = 'top'

main.character = main.addVPanel('Character')
main.character.alignChildren = 'left'
main.character.font = main.character.addHGroup()
main.character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
var fontEdit = main.character.font.add('edittext', [0, 0, 75, 21])
fontEdit.validateUnits()
fontEdit.active = true
main.character.attrs = main.character.addHGroup()
main.character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
var italicCheck = main.character.attrs.add('checkbox', undefined, 'Italic')
var underlineCheck = main.character.attrs.add('checkbox', undefined, 'Underline')

main.color = main.addVPanel('Color')
main.color.fill = main.color.addHGroup()
main.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = main.color.fill.add('dropdownlist', undefined, COLORS)
main.color.stroke = main.color.addHGroup()
main.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = main.color.stroke.add('dropdownlist', undefined, COLORS)

addAction('Cancel')
addAction('OK', function() {
    selectAll(function(item) {
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