// incomplete

#target Illustrator
#include '../.lib/commons-colors.js'
#include '../.lib/ui-validator.js'

var BOUNDS_CONTENT_TEXT = [0, 0, 80, 21]
var BOUNDS_CHARACTERS_TEXT = [0, 0, 65, 21]

createDialog('Add Header/Footer')
dialog.main.alignChildren = 'fill'

var kind = dialog.main.addHGroup()
var content = dialog.main.addVPanel('Content')
content.alignChildren = 'fill'
var character = dialog.main.addVPanel('Character')
character.alignChildren = 'left'

kind.add('statictext', undefined, 'Header/Footer:').justify = 'right'
kind.headerCheck = kind.add('checkbox', undefined, 'Header')
kind.footerCheck = kind.add('checkbox', undefined, 'Footer')

var contentOnClick = function() {
    content.customEdit.enabled = content.what.customRadio.value
    content.customEdit.active = content.what.customRadio.value
}
content.what = content.addHGroup()
content.what.add('statictext', BOUNDS_CONTENT_TEXT, 'What to type:').justify = 'right'
content.what.artboardRadio = content.what.add('radiobutton', undefined, 'Artboard name')
content.what.artboardRadio.value = true
content.what.artboardRadio.onClick = contentOnClick
content.what.customRadio = content.what.add('radiobutton', undefined, 'Custom')
content.what.customRadio.onClick = contentOnClick
content.custom = content.addHGroup()
content.custom.alignChildren = 'top'
content.custom.add('statictext', BOUNDS_CONTENT_TEXT, 'Custom:').justify = 'right'
content.customEdit = content.custom.add('edittext', [0, 0, 200, 21])
content.customEdit.enabled = false

character.font = character.addHGroup()
character.font.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Font size:').justify = 'right'
character.fontEdit = character.font.add('edittext', [0, 0, 75, 21], '12')
character.fontEdit.validateUnits()
character.fill = character.addHGroup()
character.fill.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Fill:').justify = 'right'
character.fillList = character.fill.add('dropdownlist', undefined, COLORS)
character.fillList.selection = 0
character.attrs = character.addHGroup()
character.attrs.add('statictext', BOUNDS_CHARACTERS_TEXT, 'Attributes:').justify = 'right'
character.italicCheck = character.attrs.add('checkbox', undefined, 'Italic')
character.underlineCheck = character.attrs.add('checkbox', undefined, 'Underline')

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    if (kind.headerCheck.value) createType()
    if (kind.footerCheck.value) createType()
})
show()

function createType() {
    var text = document.textFrames.add()
} 