/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'
#include '../.lib/units.js'
#include '../.lib/validator.js'

const BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = Dialog('Select texts')
dialog.root.alignChildren = 'top'

dialog.character = dialog.root.addPanel('Character')
dialog.character.alignChildren = 'left'
dialog.character.font = dialog.character.add('group')
dialog.character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
dialog.character.fontEdit = dialog.character.font.add('edittext', [0, 0, 75, 21])
dialog.character.fontEdit.validateUnits()
dialog.character.fontEdit.active = true
dialog.character.attrs = dialog.character.add('group')
dialog.character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
dialog.character.attrsItalic = dialog.character.attrs.add('checkbox', undefined, 'Italic')
dialog.character.attrsUnderline = dialog.character.attrs.add('checkbox', undefined, 'Underline')

dialog.color = dialog.root.addPanel('Color')
dialog.color.fill = dialog.color.add('group')
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
dialog.color.fillList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.add('group')
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
dialog.color.strokeList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.onAction(function() {
    selectItems([SELECT_TEXT_FRAME], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseInt(dialog.character.fontEdit.text) || 0
        if (fontSize > 0) {
            condition = condition && fontSize == attr.size
        }
        if (dialog.character.attrsItalic.value) {
            condition = condition && attr.italics
        }
        if (dialog.character.attrsUnderline.value) {
            condition = condition && attr.underline
        }
        if (dialog.color.fillList.selection != null) {
            condition = condition && attr.fillColor.equalTo(parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && attr.strokeColor.equalTo(parseColor(dialog.color.strokeList.selection.text))
        }
        return condition
    })
})
dialog.show()