/*
<javascriptresource>
<name>Resize Canvases...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var BOUNDS_TEXT = [50, 21]
var BOUNDS_EDIT = [100, 21]

var dialog = new Dialog('Resize Canvases')
var widthEdit, heightEdit, anchorGroup

dialog.hgroup(function(main) {
    main.alignChildren = 'fill'
    main.vpanel('Canvas', function(panel) {
        panel.hgroup(function(group) {
            group.tips("Canvases' new width")
            group.staticText(BOUNDS_TEXT, 'Width:').also(JUSTIFY_RIGHT)
            widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2)).also(function(it) {
                it.validateUnits()
                it.activate()
            })
        })
        panel.hgroup(function(group) {
            group.tips("Canvases' new height")
            group.staticText(BOUNDS_TEXT, 'Height:').also(JUSTIFY_RIGHT)
            heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
        })
    })
    main.vpanel('Anchor', function(panel) {
        anchorGroup = new AnchorGroup(panel, true)
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var width = new UnitValue(widthEdit.text)
    var height = new UnitValue(heightEdit.text)
    var anchor = anchorGroup.getAnchorPosition()

    var progress = new ProgressPalette(app.documents.length, 'Resizing')
    for (var i = 0; i < app.documents.length; i++) {
        progress.increment()
        var document = app.documents[i]
        app.activeDocument = document
        document.resizeCanvas(width, height, anchor)
    }
})
dialog.show()