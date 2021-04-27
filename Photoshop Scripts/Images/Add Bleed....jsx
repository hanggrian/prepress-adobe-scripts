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

dialog.main.hgroup(function(group) {
    group.setHelpTips('Bleed are distributed around image.')
    group.staticText(BOUNDS_TEXT, 'Bleed:', JUSTIFY_RIGHT)
    bleedEdit = group.editText(BOUNDS_EDIT, unitsOf('2.5 mm'), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.main.hgroup(function(group) {
    group.setHelpTips('Guides will mark where bleed are added.')
    group.staticText(BOUNDS_TEXT, 'Guide Layout:', JUSTIFY_RIGHT)
    guideLayoutCheck = group.checkBox(undefined, 'Enable', SELECTED)
})
dialog.main.hgroup(function(group) {
    group.setHelpTips('Layers will be flattened.')
    group.staticText(BOUNDS_TEXT, 'Flatten:', JUSTIFY_RIGHT)
    flattenCheck = group.checkBox(undefined, 'Enable')
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var bleed = UnitValue(bleedEdit.text)
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
    }
})
dialog.show()