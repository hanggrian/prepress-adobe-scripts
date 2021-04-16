// work in progress

#target Illustrator
#include '../.lib/commons-colors.js'
#include '../.lib/ui-validator.js'

var dialog = new Dialog('Add Header/Footer')

dialog.main.alignChildren = 'fill'

dialog.kind = dialog.main.addHGroup()
dialog.kind.addText(undefined, 'Header/Footer:', 'right')
dialog.kind.headerCheck = dialog.kind.addCheckBox(undefined, 'Header')
dialog.kind.footerCheck = dialog.kind.addCheckBox(undefined, 'Footer')

var contentTextBounds = [0, 0, 80, 21]
var contentOnClick = function() {
    dialog.content.customEdit.enabled = dialog.content.what.customRadio.value
    dialog.content.customEdit.active = dialog.content.what.customRadio.value
}
dialog.content = dialog.main.addVPanel('Content')
dialog.content.alignChildren = 'fill'
dialog.content.what = dialog.content.addHGroup()
dialog.content.what.addText(contentTextBounds, 'What to type:', 'right')
dialog.content.what.artboardRadio = dialog.content.what.addRadioButton(undefined, 'Artboard name')
dialog.content.what.artboardRadio.value = true
dialog.content.what.artboardRadio.onClick = contentOnClick
dialog.content.what.customRadio = dialog.content.what.addRadioButton(undefined, 'Custom')
dialog.content.what.customRadio.onClick = contentOnClick
dialog.content.custom = dialog.content.addHGroup()
dialog.content.custom.alignChildren = 'top'
dialog.content.custom.addText(contentTextBounds, 'Custom:', 'right')
dialog.content.customEdit = dialog.content.custom.addEditText([0, 0, 200, 21])
dialog.content.customEdit.enabled = false

var characterTextBounds = [0, 0, 65, 21]
dialog.character = dialog.main.addVPanel('Character')
dialog.character.alignChildren = 'left'
dialog.character.font = dialog.character.addHGroup()
dialog.character.font.addText(characterTextBounds, 'Font size:', 'right')
dialog.character.fontEdit = dialog.character.font.addEditText([0, 0, 75, 21], '12')
dialog.character.fontEdit.validateUnits()
dialog.character.fill = dialog.character.addHGroup()
dialog.character.fill.addText(characterTextBounds, 'Fill:', 'right')
dialog.character.fillList = dialog.character.fill.addDropDown(undefined, COLORS)
dialog.character.fillList.selection = COLORS.indexOf('Registration')
dialog.character.attrs = dialog.character.addHGroup()
dialog.character.attrs.addText(characterTextBounds, 'Attributes:', 'right')
dialog.character.italicCheck = dialog.character.attrs.addCheckBox(undefined, 'Italic')
dialog.character.underlineCheck = dialog.character.attrs.addCheckBox(undefined, 'Underline')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    if (dialog.kind.headerCheck.value) createType()
    if (dialog.kind.footerCheck.value) createType()
})
dialog.show()

function createType() {
    var text = document.textFrames.add()
} 