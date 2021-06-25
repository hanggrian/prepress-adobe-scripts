#target Illustrator
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'

var TYPES = ['Composite', 'Separations']

var BOUNDS_TEXT = [40, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Add Registration Marks')
var sizeSRadio, sizeMRadio, sizeLRadio, typesList, offsetEdit, anchorGroup

dialog.hgroup(function(topGroup) {
    topGroup.alignChildren = 'fill'
    topGroup.vpanel('Registration Marks', function(panel) {
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_TEXT, 'Size:', JUSTIFY_RIGHT)
            sizeSRadio = group.radioButton(undefined, 'S')
            sizeMRadio = group.radioButton(undefined, 'M', SELECTED)
            sizeLRadio = group.radioButton(undefined, 'L')
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_TEXT, 'Types:', JUSTIFY_RIGHT)
            typesList = group.dropDownList(BOUNDS_EDIT, TYPES, function(it) {
                it.selectText('Composite')
            })
        })
        panel.hgroup(function(group) {
            group.staticText(BOUNDS_TEXT, 'Offset:', JUSTIFY_RIGHT)
            offsetEdit = group.editText(BOUNDS_EDIT, '2.5 mm', VALIDATE_UNITS)
        })
    })
    topGroup.vpanel('Anchor', function(panel) {
        anchorGroup = new AnchorGroup(panel)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    if (sizeSRadio.value && typesList.selection.text === 'Composite') {
        preferences.setPDFPage(0)
    } else if (sizeMRadio.value && typesList.selection.text === 'Composite') {
        preferences.setPDFPage(1)
    } else if (sizeLRadio.value && typesList.selection.text === 'Composite') {
        preferences.setPDFPage(2)
    } else if (sizeSRadio.value && typesList.selection.text === 'Separations') {
        preferences.setPDFPage(3)
    } else if (sizeMRadio.value && typesList.selection.text === 'Separations') {
        preferences.setPDFPage(4)
    } else if (sizeLRadio.value && typesList.selection.text === 'Separations') {
        preferences.setPDFPage(5)
    }
    var offset = parseUnits(offsetEdit.text)

    var placed = document.placedItems.add()
    placed.file = getResource(R.ai.registration_marks)

    var bounds = document.artboards[document.artboards.getActiveArtboardIndex()].artboardRect

    var left = bounds.first()
    var top = bounds[1]
    var right = bounds[2]
    var bottom = bounds[3]

    var width = right - left
    var height = top - bottom

    var newLeft, newTop
    if (anchorGroup.isVerticalLeft()) {
        newLeft = left + offset
    } else if (anchorGroup.isVerticalCenter()) {
        newLeft = width / 2 + left - placed.width / 2
    } else {
        newLeft = width + left - placed.width - offset
    }
    if (anchorGroup.isHorizontalTop()) {
        newTop = top - offset
    } else if (anchorGroup.isHorizontalCenter()) {
        newTop = top - height / 2 + placed.height / 2
    } else {
        newTop = top - height + placed.height + offset
    }

    placed.position = [newLeft, newTop]
    placed.embed()
})
dialog.show()