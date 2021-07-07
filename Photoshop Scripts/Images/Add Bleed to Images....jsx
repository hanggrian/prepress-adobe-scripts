/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

// Increase canvas size and create new guide layout separating content
// and bleed area.

#target Photoshop
#include '../.lib/commons.js'

var dialog = new Dialog('Add Bleed to Images')
var bleedEdit, guidesCheck, flattenCheck
var selectionCheck, horizontalExtraGroup, horizontalExtraEdit, verticalExtraGroup, verticalExtraEdit

dialog.hgroup(function(group) {
    group.setTooltips('Bleed are distributed around image')
    group.staticText(undefined, 'Bleed:', JUSTIFY_RIGHT)
    bleedEdit = group.editText([100, 21], unitsOf('2.5 mm'), function(it) {
        it.validateUnits()
        it.activate()
    })
})
guidesCheck = dialog.checkBox(undefined, 'Guide Layout', function(it) {
    it.setTooltip('Guides will mark where bleed are added')
    it.select()
})
flattenCheck = dialog.checkBox(undefined, 'Flatten Image', function(it) {
    it.setTooltip('Layers will be flattened')
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var bleed = new UnitValue(bleedEdit.text)
    for (var i = 0; i < app.documents.length; i++) {
        var document = app.documents[i]
        app.activeDocument = document
        var originalWidth = document.width
        var originalHeight = document.height
        if (guidesCheck.value) {
            document.guides.add(Direction.HORIZONTAL, 0)
            document.guides.add(Direction.HORIZONTAL, document.height)
            document.guides.add(Direction.VERTICAL, 0)
            document.guides.add(Direction.VERTICAL, document.width)
        }
        document.resizeCanvas(originalWidth + bleed * 2, originalHeight + bleed * 2)
        if (flattenCheck.value) {
            document.flatten()
        }
        /*document.selection.select([
            [bleed, bleed],
            [bleed, bleed + originalHeight],
            [bleed + originalWidth, bleed + originalHeight],
            [bleed + originalWidth, bleed]
        ])*/
    }
})
dialog.show()