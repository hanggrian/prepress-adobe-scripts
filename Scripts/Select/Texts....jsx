/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/colors.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'
#include '../.lib/units.js'

const BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = new Window('dialog', 'Select texts')

dialog.main = dialog.add('group')
dialog.buttons = dialog.add('group')

dialog.main.alignChildren = 'fill'
dialog.character = dialog.main.add('panel', undefined, 'Character')
dialog.color = dialog.main.add('panel', undefined, 'Color')

dialog.character.alignChildren = 'fill'
dialog.character.add('group')
dialog.character.fontSize = dialog.character.add('group')
dialog.character.fontSize.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
var fontSizeEdit = dialog.character.fontSize.add('edittext', [0, 0, 75, 21])
fontSizeEdit.active = true
dialog.character.attributes = dialog.character.add('group')
dialog.character.attributes.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
var italicCheck = dialog.character.attributes.add('checkbox', undefined, 'Italic')
var underlineCheck = dialog.character.attributes.add('checkbox', undefined, 'Underline')

dialog.color.add('group')
dialog.color.fill = dialog.color.add('group')
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillColorList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.add('group')
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeColorList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.buttons.alignment = 'right'
dialog.buttons.add('button', undefined, 'Cancel')
dialog.buttons.add('button', undefined, 'OK').onClick = function() {
    dialog.close()

    selectItems([SELECT_TEXT_FRAME], function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        
        var fontSize = parseInt(fontSizeEdit.text) || 0
        if (fontSize > 0) {
            condition = condition && fontSize == attr.size
        }
        if (italicCheck.value) {
            condition = condition && attr.italics
        }
        if (underlineCheck.value) {
            condition = condition && attr.underline
        }
        if (fillColorList.selection != null) {
            condition = condition && sameColor(attr.fillColor, parseColor(fillColorList.selection.text))
        }
        if (strokeColorList.selection != null) {
            condition = condition && sameColor(attr.strokeColor, parseColor(strokeColorList.selection.text))
        }

        return condition
    })
}

dialog.show()