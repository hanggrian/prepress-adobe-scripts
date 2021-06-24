/*
<javascriptresource>
<category>1</category>
</javascriptresource>
*/

// Increase canvas size and create new guide layout separating content
// and bleed area.

#target Photoshop
#include '../.lib/commons.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]
var RESAMPLES = ['Bicubic', 'Bicubic Sharper', 'Bicubic Smoother', 'Bilinear', 'Nearest Neighbor', 'None']

var dialog = new Dialog('Resize Images')
var widthEdit, heightEdit, resolutionEdit, resampleList

dialog.hgroup(function(group) {
    group.setTooltips("Images' new width")
    group.staticText(BOUNDS_TEXT, 'Width:', JUSTIFY_RIGHT)
    widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2), function(it) {
        it.validateUnits()
        it.activate()
    })
})
dialog.hgroup(function(group) {
    group.setTooltips("Images' new height")
    group.staticText(BOUNDS_TEXT, 'Height:', JUSTIFY_RIGHT)
    heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2), VALIDATE_UNITS)
})
dialog.hgroup(function(group) {
    group.setTooltips("Images' new resolution")
    group.staticText(BOUNDS_TEXT, 'Resolution:', JUSTIFY_RIGHT)
    resolutionEdit = group.editText(BOUNDS_EDIT, document.resolution, VALIDATE_UNITS)
})
dialog.hgroup(function(group) {
    group.setTooltips('Method to resample new images')
    group.staticText(BOUNDS_TEXT, 'Resample:', JUSTIFY_RIGHT)
    resampleList = group.dropDownList(undefined, RESAMPLES, function(it) {
        it.selection = RESAMPLES.indexOf('Bicubic')
    })
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = UnitValue(widthEdit.text)
    var height = UnitValue(heightEdit.text)
    var resolution = parseInt(resolutionEdit.text)
    var resample = getResample()
    for (var i = 0; i < app.documents.length; i++) {
        app.activeDocument = app.documents[i]
        app.activeDocument.resizeImage(width, height, resolution, resample)
    }
})
dialog.show()

function getResample() {
    switch (resampleList.selection.text) {
        case 'Bicubic':
            return ResampleMethod.BICUBIC
        case 'Bicubic Sharper':
            return ResampleMethod.BICUBICSHARPER
        case 'Bicubic Smoother':
            return ResampleMethod.BICUBICSMOOTHER
        case 'Bilinear':
            return ResampleMethod.BILINEAR
        case 'Nearest Neighbor':
            return ResampleMethod.NEARESTNEIGHBOR
        default:
            return ResampleMethod.NONE
    }
}