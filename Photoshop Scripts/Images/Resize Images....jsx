/*
<javascriptresource>
<name>Resize Images...</name>
<category>2</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target Photoshop
#include '../.lib/commons.js'

var BOUNDS_TEXT = [70, 21]
var BOUNDS_EDIT = [100, 21]
var RESAMPLES = ['Bicubic', 'Bicubic Sharper', 'Bicubic Smoother', 'Bilinear', 'Nearest Neighbor', 'None']

var dialog = new Dialog('Resize Images')
var widthEdit, heightEdit, resolutionEdit, resampleList

dialog.vgroup(function(main) {
    main.alignChildren = 'fill'
    main.hgroup(function(group) {
        group.tips("Images' new width")
        group.staticText(BOUNDS_TEXT, 'Width:').also(JUSTIFY_RIGHT)
        widthEdit = group.editText(BOUNDS_EDIT, formatUnits(document.width, unitName, 2)).also(function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    main.hgroup(function(group) {
        group.tips("Images' new height")
        group.staticText(BOUNDS_TEXT, 'Height:').also(JUSTIFY_RIGHT)
        heightEdit = group.editText(BOUNDS_EDIT, formatUnits(document.height, unitName, 2)).also(VALIDATE_UNITS)
    })
    main.hgroup(function(group) {
        group.tips("Images' new resolution")
        group.staticText(BOUNDS_TEXT, 'Resolution:').also(JUSTIFY_RIGHT)
        resolutionEdit = group.editText(BOUNDS_EDIT, document.resolution).also(VALIDATE_UNITS)
    })
    main.hgroup(function(group) {
        group.tips('Method to resample new images')
        group.staticText(BOUNDS_TEXT, 'Resample:').also(JUSTIFY_RIGHT)
        resampleList = group.dropDownList(undefined, RESAMPLES).also(function(it) {
            it.selectText('Bicubic')
        })
    })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
    var width = new UnitValue(widthEdit.text)
    var height = new UnitValue(heightEdit.text)
    var resolution = parseInt(resolutionEdit.text)
    var resample = getResample()

    var progress = new ProgressDialog(app.documents.length, 'Resizing')
    for (var i = 0; i < app.documents.length; i++) {
        progress.increment()
        var document = app.documents[i]
        app.activeDocument = document
        document.resizeImage(width, height, resolution, resample)
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