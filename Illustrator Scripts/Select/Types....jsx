/**
 * Select all TextFrame with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../../.rootlib/core-units.js'
#include '../../.rootlib/sui-validator.js'
#include '../.lib/commons-colors.js'
#include '../.lib/commons-select.js'

allowSelectionType(SELECT_TEXT_FRAME)

createDialog('Select Types')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var characterTextBounds = [0, 0, 65, 21]
dialog.character = dialog.line.addVPanel('Character')
dialog.character.alignChildren = 'left'
dialog.character.font = dialog.character.addHGroup()
dialog.character.font.addText(characterTextBounds, 'Font size:', 'right')
dialog.character.fontEdit = dialog.character.font.add('edittext', [0, 0, 75, 21])
dialog.character.fontEdit.validateUnits()
dialog.character.fontEdit.active = true
dialog.character.attrs = dialog.character.addHGroup()
dialog.character.attrs.addText(characterTextBounds, 'Attributes:', 'right')
dialog.character.italicCheck = dialog.character.attrs.addCheckBox(undefined, 'Italic')
dialog.character.underlineCheck = dialog.character.attrs.addCheckBox(undefined, 'Underline')

var colorTextBounds = [0, 0, 45, 21]
dialog.color = dialog.line.addVPanel('Color')
dialog.color.fill = dialog.color.addHGroup()
dialog.color.fill.addText(colorTextBounds, 'Fill:', 'right')
dialog.color.fillList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.addText(colorTextBounds, 'Stroke:', 'right')
dialog.color.strokeList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selectAll(function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseInt(dialog.character.fontEdit.text) || 0
        if (fontSize > 0) condition = condition && fontSize == attr.size
        if (dialog.character.italicCheck.value) condition = condition && attr.italics
        if (dialog.character.underlineCheck.value) condition = condition && attr.underline
        if (dialog.color.fillList.selection != null) {
            condition = condition && attr.fillColor.equalTo(parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && attr.strokeColor.equalTo(parseColor(dialog.color.strokeList.selection.text))
        }
        return condition
    })
})
show()