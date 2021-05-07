// work in progress

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_CONTENT_TEXT = [80, 21]
var BOUNDS_CHAR_TEXT = [65, 21]

var dialog = new Dialog('Add Caption', 'fill')
var headerRadio, footerRadio
var artboardRadio, customRadio, customEdit
var fontEdit, fillList, italicCheck, underlineCheck

dialog.main.hgroup(function(group) {
    group.staticText(undefined, 'Header/Footer:', JUSTIFY_RIGHT)
    headerRadio = group.radioButton(undefined, 'Header', SELECTED)
    footerRadio = group.radioButton(undefined, 'Footer')
})

var contentOnClick = function() {
    customEdit.enabled = customRadio.value
    customEdit.active = customRadio.value
}
dialog.main.vpanel('Content', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CONTENT_TEXT, 'What to type:', JUSTIFY_RIGHT)
        artboardRadio = group.radioButton(undefined, 'Artboard name', function(it) {
            it.value = true
            it.onClick = contentOnClick
        })
        customRadio = group.radioButton(undefined, 'Custom')
        customRadio.onClick = contentOnClick
    })
    panel.hgroup(function(group) {
        group.alignChildren = 'top'
        group.staticText(BOUNDS_CONTENT_TEXT, 'Custom:', JUSTIFY_RIGHT)
        customEdit = group.editText([200, 21], undefined, function(it) {
            it.enabled = false
        }, { multiline: true })
    })
})

dialog.main.vpanel('Character', function(panel) {
    panel.alignChildren = 'left'
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHAR_TEXT, 'Font size:', JUSTIFY_RIGHT)
        fontEdit = group.editText([75, 21], '12', VALIDATE_UNITS)
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHAR_TEXT, 'Fill:', JUSTIFY_RIGHT)
        fillList = group.dropDownList(undefined, COLORS, function(it) {
            it.selection = COLORS.indexOf('Registration')
        })
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_CHAR_TEXT, 'Attributes:', JUSTIFY_RIGHT)
        italicCheck = group.checkBox(undefined, 'Italic')
        underlineCheck = group.checkBox(undefined, 'Underline')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    if (dialog.kind.headerCheck.value) createType()
    if (dialog.kind.footerCheck.value) createType()
})
dialog.show()

function createType() {
    var text = document.textFrames.add()
} 