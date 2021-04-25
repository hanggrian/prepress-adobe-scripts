// Increase canvas size and create new guide layout separating content
// and bleed area.

/*
<javascriptresource>
<category>3</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var BOUNDS_TEXT = [100, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Add Bleed')
var bleedEdit, guideLayoutCheck, flattenCheck
var selectionCheck, horizontalExtraGroup, horizontalExtraEdit, verticalExtraGroup, verticalExtraEdit

dialog.vpanel('Image', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setHelpTips('Bleed are distributed around image.')
        group.staticText(BOUNDS_TEXT, 'Bleed:', JUSTIFY_RIGHT)
        bleedEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Guides will mark where bleed are added.')
        group.staticText(BOUNDS_TEXT, 'Guide Layout:', JUSTIFY_RIGHT)
        guideLayoutCheck = group.checkBox(undefined, 'Enable', SELECTED)
    })
    panel.hgroup(function(group) {
        group.setHelpTips('Layers will be flattened.')
        group.staticText(BOUNDS_TEXT, 'Flatten:', JUSTIFY_RIGHT)
        flattenCheck = group.checkBox(undefined, 'Enable')
    })
})

dialog.vpanel('Selection', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.setHelpTips('Selecting all pixels minus bleed area.')
        group.staticText(BOUNDS_TEXT, 'Select Bleed:', JUSTIFY_RIGHT)
        selectionCheck = group.checkBox(undefined, 'Enable', function(it) {
            it.onClick = function() {
                horizontalExtraGroup.enabled = it.value
                verticalExtraGroup.enabled = it.value
            }
        })
    })
    horizontalExtraGroup = panel.hgroup(function(group) {
        group.enabled = false
        group.setHelpTips('Extra area to horizontal bleed.', JUSTIFY_RIGHT)
        group.staticText(BOUNDS_TEXT, 'Horizontal Extra:')
        horizontalExtraEdit = group.editText(BOUNDS_EDIT, '0 px', VALIDATE_UNITS)
    })
    verticalExtraGroup = panel.hgroup(function(group) {
        group.enabled = false
        group.setHelpTips('Extra area to vertical bleed.')
        group.staticText(BOUNDS_TEXT, 'Vertical Extra:', JUSTIFY_RIGHT)
        verticalExtraEdit = group.editText(BOUNDS_EDIT, '0 px', VALIDATE_UNITS)
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var bleed = UnitValue(bleedEdit.text)
    var horizontalExtra = UnitValue(horizontalExtraEdit.text)
    var verticalExtra = UnitValue(verticalExtraEdit.text)
    for (var i = 0; i < app.documents.length; i++) {
        app.activeDocument = app.documents[i]
        var originalWidth = app.activeDocument.width
        var originalHeight = app.activeDocument.height
        if (guideLayoutCheck.value) {
            app.activeDocument.guides.add(Direction.HORIZONTAL, 0)
            app.activeDocument.guides.add(Direction.HORIZONTAL, app.activeDocument.height)
            app.activeDocument.guides.add(Direction.VERTICAL, 0)
            app.activeDocument.guides.add(Direction.VERTICAL, app.activeDocument.width)
        }
        app.activeDocument.resizeCanvas(originalWidth + bleed * 2, originalHeight + bleed * 2)
        if (flattenCheck.value) {
            app.activeDocument.flatten()
        }
        if (selectionCheck.value) {
            app.activeDocument.selection.selectAll()
            app.activeDocument.selection.resize(
                (originalWidth.as('px') - horizontalExtra.as('px') * 2) * 100 / app.activeDocument.width.as('px'),
                (originalHeight.as('px') - verticalExtra.as('px') * 2) * 100 / app.activeDocument.height.as('px'),
                AnchorPosition.MIDDLECENTER)
        }
    }
})
dialog.show()