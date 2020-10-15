/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/core-units.js'
#include '../.lib/commons-colors.js'
#include '../.lib/commons-select.js'
#include '../.lib/ui-validator.js'

var BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]
var BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

allowSelectionType(SELECT_TEXT_FRAME)

createDialog('Select Texts')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var character = dialog.line.addVPanel('Character')
character.alignChildren = 'left'
character.font = character.addHGroup()
character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
character.fontEdit = character.font.add('edittext', [0, 0, 75, 21])
character.fontEdit.validateUnits()
character.fontEdit.active = true
character.attrs = character.addHGroup()
character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
character.italicCheck = character.attrs.add('checkbox', undefined, 'Italic')
character.underlineCheck = character.attrs.add('checkbox', undefined, 'Underline')

var color = dialog.line.addVPanel('Color')
color.fill = color.addHGroup()
color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
color.fillList = color.fill.add('dropdownlist', undefined, COLORS)
color.stroke = color.addHGroup()
color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
color.strokeList = color.stroke.add('dropdownlist', undefined, COLORS)

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selectAll(function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseInt(character.fontEdit.text) || 0
        if (fontSize > 0) condition = condition && fontSize == attr.size
        if (character.italicCheck.value) condition = condition && attr.italics
        if (character.underlineCheck.value) condition = condition && attr.underline
        if (color.fillList.selection != null) {
            condition = condition && attr.fillColor.equalTo(parseColor(color.fillList.selection.text))
        }
        if (color.strokeList.selection != null) {
            condition = condition && attr.strokeColor.equalTo(parseColor(color.strokeList.selection.text))
        }
        return condition
    })
})
show()