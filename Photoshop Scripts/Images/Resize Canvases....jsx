// Increase canvas size and create new guide layout separating content
// and bleed area.

/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

#target Photoshop
#include '../../.stdlib/ui/anchor.js'
#include '../.lib/commons.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Canvases')
var widthEdit, heightEdit, anchorGroup

dialog.hgroup(function(group) {
    group.setTooltips("Canvases' new width")
    group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, document.width, function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.hgroup(function(group) {
    group.setTooltips("Canvases' new height")
    group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, document.height, VALIDATE_UNITS)
})
dialog.hgroup(function(group) {
    group.alignChildren = 'top'
    group.setTooltips('The anchor point to resize around')
    group.staticText(BOUNDS_TEXT, 'Anchor:', JUSTIFY_RIGHT)
    anchorGroup = new AnchorGroup(group)
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = UnitValue(widthEdit.text)
    var height = UnitValue(heightEdit.text)
    var anchor = anchorGroup.getAnchorPosition()
    for (var i = 0; i < app.documents.length; i++) {
        app.activeDocument = app.documents[i]
        app.activeDocument.resizeCanvas(width, height, anchor)
    }
})
dialog.show()