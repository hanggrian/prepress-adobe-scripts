// Select all TextFrame with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

allowSelectionType(SELECT_TEXT_FRAME)

var dialog = new Dialog('Select Types')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var characterTextBounds = [0, 0, 65, 21]
dialog.character = dialog.line.addVPanel('Character')
dialog.character.alignChildren = 'left'
dialog.character.font = dialog.character.addHGroup()
dialog.character.font.addText(characterTextBounds, 'Font size:', 'right')
dialog.character.fontEdit = dialog.character.font.addEditText([0, 0, 75, 21])
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
dialog.color.fillList = dialog.color.fill.addDropDown(undefined, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.addText(colorTextBounds, 'Stroke:', 'right')
dialog.color.strokeList = dialog.color.stroke.addDropDown(undefined, COLORS)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    selectAll(function(item) {
        var attr = item.textRange.characterAttributes
        var condition = true
        var fontSize = parseUnit(dialog.character.fontEdit.text)
        if (fontSize > 0) {
            condition = condition && fontSize == attr.size
        }
        if (dialog.character.italicCheck.value) {
            condition = condition && attr.italics
        }
        if (dialog.character.underlineCheck.value) {
            condition = condition && attr.underline
        }
        if (dialog.color.fillList.selection != null) {
            condition = condition && isColorEqual(attr.fillColor, parseColor(dialog.color.fillList.selection.text))
        }
        if (dialog.color.strokeList.selection != null) {
            condition = condition && isColorEqual(attr.strokeColor, parseColor(dialog.color.strokeList.selection.text))
        }
        return condition
    })
})
dialog.show()