// Increase canvas size and create new guide layout separating content
// and bleed area.

/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed to Images')
var bleedEdit, guidesCheck, flattenCheck
var selectionCheck, horizontalExtraGroup, horizontalExtraEdit, verticalExtraGroup, verticalExtraEdit

dialog.main.hgroup(function(group) {
    group.setTooltips('Bleed are distributed around image')
    group.staticText(undefined, 'Bleed:', JUSTIFY_RIGHT)
    bleedEdit = group.editText([100, 21], unitsOf('2.5 mm'), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.main.hgroup(function(group) {
    guidesCheck = group.checkBox(undefined, 'Guides', function(it) {
        it.setTooltip('Guides will mark where bleed are added')
        it.select()
    })
    flattenCheck = group.checkBox(undefined, 'Flatten', function(it) {
        it.setTooltip('Layers will be flattened')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var bleed = UnitValue(bleedEdit.text)
    for (var i = 0; i < app.documents.length; i++) {
        app.activeDocument = app.documents[i]
        var originalWidth = app.activeDocument.width
        var originalHeight = app.activeDocument.height
        if (guidesCheck.value) {
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