/**
 * Select all PlacedItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 * 
 * The file type options are similar with Illustrator native `Relink...` dialog.
 */

#target Illustrator
#include '../../.rootlib/sui-validator.js'
#include '../.lib/core-units.js'
#include '../.lib/commons-select.js'

var FILE_AI = ['ai']
var FILE_PDF = ['pdf']
var FILE_BMP = ['bmp']
var FILE_GIF = ['gif']
var FILE_JPEG = ['jpg', 'jpe', 'jpeg']
var FILE_JPEG2000 = ['jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']
var FILE_PNG = ['png', 'pns']
var FILE_PSD = ['psd', 'psb', 'pdd']
var FILE_TIFF = ['tif', 'tiff']

allowSelectionType(SELECT_PLACED)

createDialog('Select Links')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var dimensionTextBounds = [0, 0, 45, 21]
var dimensionEditBounds = [0, 0, 100, 21]
dialog.dimension = dialog.line.addVPanel('Dimension')
dialog.dimension.width = dialog.dimension.addHGroup()
dialog.dimension.width.addText(dimensionTextBounds, 'Width:', 'right')
dialog.dimension.widthEdit = dialog.dimension.width.addEditText(dimensionEditBounds)
dialog.dimension.widthEdit.validateUnits()
dialog.dimension.widthEdit.active = true
dialog.dimension.height = dialog.dimension.addHGroup()
dialog.dimension.height.addText(dimensionTextBounds, 'Height:', 'right')
dialog.dimension.heightEdit = dialog.dimension.height.addEditText(dimensionEditBounds)
dialog.dimension.heightEdit.validateUnits()

dialog.types = dialog.line.addVPanel('File types')
dialog.types.alignChildren = 'fill'
dialog.types.aiCheck = dialog.types.addCheckBox(undefined, getTypeString('Adobe Illustrator', FILE_AI))
dialog.types.pdfCheck = dialog.types.addCheckBox(undefined, getTypeString('Adobe PDF', FILE_PDF))
dialog.types.bmpCheck = dialog.types.addCheckBox(undefined, getTypeString('BMP', FILE_BMP))
dialog.types.gifCheck = dialog.types.addCheckBox(undefined, getTypeString('GIF89a', FILE_GIF))
dialog.types.jpegCheck = dialog.types.addCheckBox(undefined, getTypeString('JPEG', FILE_JPEG))
dialog.types.jpeg2000Check = dialog.types.addCheckBox(undefined, getTypeString('JPEG2000', FILE_JPEG2000))
dialog.types.pngCheck = dialog.types.addCheckBox(undefined, getTypeString('PNG', FILE_PNG))
dialog.types.psdCheck = dialog.types.addCheckBox(undefined, getTypeString('Photoshop', FILE_PSD))
dialog.types.tiffCheck = dialog.types.addCheckBox(undefined, getTypeString('TIFF', FILE_TIFF))

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selectAll(function(item) {
        var condition = true
        var width = parseUnit(dialog.dimension.widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) == parseInt(item.width)
        }
        var height = parseUnit(dialog.dimension.heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) == parseInt(item.height)
        }

        var condition2 = false
        var extension = item.file.name.split('.').pop()
        if (dialog.types.aiCheck.value) condition2 = condition2 || contains(FILE_AI, extension)
        if (dialog.types.pdfCheck.value) condition2 = condition2 || contains(FILE_PDF, extension)
        if (dialog.types.bmpCheck.value) condition2 = condition2 || contains(FILE_BMP, extension)
        if (dialog.types.gifCheck.value) condition2 = condition2 || contains(FILE_GIF, extension)
        if (dialog.types.jpegCheck.value) condition2 = condition2 || contains(FILE_JPEG, extension)
        if (dialog.types.jpeg2000Check.value) condition2 = condition2 || contains(FILE_JPEG2000, extension)
        if (dialog.types.pngCheck.value) condition2 = condition2 || contains(FILE_PNG, extension)
        if (dialog.types.psdCheck.value) condition2 = condition2 || contains(FILE_PSD, extension)
        if (dialog.types.tiffCheck.value) condition2 = condition2 || contains(FILE_TIFF, extension)

        return condition && condition2
    })
})
show()

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
        if (elements[i].toLowerCase() == element) {
            return true
        }
    }
    return false
}