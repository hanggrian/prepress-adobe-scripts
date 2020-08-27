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
dialog.root.horizontal()
dialog.root.alignChildren = 'top'

dialog.character = dialog.root.addVPanel('Character')
dialog.character.alignChildren = 'left'
dialog.character.font = dialog.character.addHGroup()
dialog.character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
var fontEdit = dialog.character.font.add('edittext', [0, 0, 75, 21])
fontEdit.validateUnits()
fontEdit.active = true
dialog.character.attrs = dialog.character.addHGroup()
dialog.character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
var italicCheck = dialog.character.attrs.add('checkbox', undefined, 'Italic')
var underlineCheck = dialog.character.attrs.add('checkbox', undefined, 'Underline')

dialog.color = dialog.root.addVPanel('Color')
dialog.color.fill = dialog.color.addHGroup()
dialog.color.fill.add('statictext', BOUNDS_COLOR_TEXT, 'Fill:').justify = 'right'
var fillList = dialog.color.fill.add('dropdownlist', undefined, COLORS)
dialog.color.stroke = dialog.color.addHGroup()
dialog.color.stroke.add('statictext', BOUNDS_COLOR_TEXT, 'Stroke:').justify = 'right'
var strokeList = dialog.color.stroke.add('dropdownlist', undefined, COLORS)

dialog.addAction('Cancel')
dialog.addAction('OK', function() {
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
dialog.show()