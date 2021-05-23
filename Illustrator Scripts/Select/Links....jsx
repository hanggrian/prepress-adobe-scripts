// Select all PlacedItem with attributes matching user input.
// When there are active selection, will only select items within those selection.
// 
// The file type options are similar with Illustrator native `Relink...` dialog.

#target Illustrator
#include '../.lib/commons.js'

var BOUNDS_DIMENSION_TEXT = [45, 21]
var BOUNDS_DIMENSION_EDIT = [150, 21]

var FILE_AI = ['ai']
var FILE_PDF = ['pdf']
var FILE_BMP = ['bmp']
var FILE_GIF = ['gif']
var FILE_JPEG = ['jpg', 'jpe', 'jpeg']
var FILE_JPEG2000 = ['jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']
var FILE_PNG = ['png', 'pns']
var FILE_PSD = ['psd', 'psb', 'pdd']
var FILE_TIFF = ['tif', 'tiff']

var dialog = new Dialog('Select Links', 'fill')
var widthEdit, heightEdit
var aiCheck, pdfCheck, bmpCheck, gifCheck, jpegCheck, jpeg2000Check, pngCheck, psdCheck, tiffCheck

dialog.vpanel('Dimension', function(panel) {
    panel.alignChildren = 'fill'
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_DIMENSION_TEXT, 'Width:', JUSTIFY_RIGHT)
        widthEdit = group.editText(BOUNDS_DIMENSION_EDIT, undefined, function(it) {
            it.validateUnits()
            it.activate()
        })
    })
    panel.hgroup(function(group) {
        group.staticText(BOUNDS_DIMENSION_TEXT, 'Height:', JUSTIFY_RIGHT)
        heightEdit = group.editText(BOUNDS_DIMENSION_EDIT, undefined, VALIDATE_UNITS)
    })
})
dialog.vpanel('File Types', function(panel) {
    panel.alignChildren = 'fill'
    aiCheck = panel.checkBox(undefined, getTypeString('Adobe Illustrator', FILE_AI))
    pdfCheck = panel.checkBox(undefined, getTypeString('Adobe PDF', FILE_PDF))
    bmpCheck = panel.checkBox(undefined, getTypeString('BMP', FILE_BMP))
    gifCheck = panel.checkBox(undefined, getTypeString('GIF89a', FILE_GIF))
    jpegCheck = panel.checkBox(undefined, getTypeString('JPEG', FILE_JPEG))
    jpeg2000Check = panel.checkBox(undefined, getTypeString('JPEG2000', FILE_JPEG2000))
    pngCheck = panel.checkBox(undefined, getTypeString('PNG', FILE_PNG))
    psdCheck = panel.checkBox(undefined, getTypeString('Photoshop', FILE_PSD))
    tiffCheck = panel.checkBox(undefined, getTypeString('TIFF', FILE_TIFF))
})

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var width = parseUnits(widthEdit.text)
    var height = parseUnits(heightEdit.text)
    selectAll(['PlacedItem'], function(item) {
        var condition = true
        if (width > 0) {
            condition = condition && parseInt(width) === parseInt(item.width)
        }
        if (height > 0) {
            condition = condition && parseInt(height) === parseInt(item.height)
        }

        var condition2 = false
        var extension = item.isFileExists() && item.file.name.split('.').pop()
        if (aiCheck.value) condition2 = condition2 || contains(FILE_AI, extension)
        if (pdfCheck.value) condition2 = condition2 || contains(FILE_PDF, extension)
        if (bmpCheck.value) condition2 = condition2 || contains(FILE_BMP, extension)
        if (gifCheck.value) condition2 = condition2 || contains(FILE_GIF, extension)
        if (jpegCheck.value) condition2 = condition2 || contains(FILE_JPEG, extension)
        if (jpeg2000Check.value) condition2 = condition2 || contains(FILE_JPEG2000, extension)
        if (pngCheck.value) condition2 = condition2 || contains(FILE_PNG, extension)
        if (psdCheck.value) condition2 = condition2 || contains(FILE_PSD, extension)
        if (tiffCheck.value) condition2 = condition2 || contains(FILE_TIFF, extension)

        return condition && condition2
    })
})
dialog.show()

function getTypeString(prefix, suffix) {
    var s = ''
    suffix.forEach(function(it, i) {
        s += it
        if (i != suffix.lastIndex()) {
            s += ', '
        }
    })
    return prefix + ' (' + s + ')'
}

function contains(elements, element) {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].toLowerCase() === element) {
            return true
        }
    }
    return false
}