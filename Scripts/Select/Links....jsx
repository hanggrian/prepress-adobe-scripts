/**
 * Select all PlacedItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 * 
 * The file type options are similar with Illustrator native `Relink...` dialog.
 */

#target Illustrator
#include '../.lib/core-units.js'
#include '../.lib/commons-select.js'
#include '../.lib/ui-validator.js'

var FILE_AI = ['ai']
var FILE_PDF = ['pdf']
var FILE_BMP = ['bmp']
var FILE_GIF = ['gif']
var FILE_JPEG = ['jpg', 'jpe', 'jpeg']
var FILE_JPEG2000 = ['jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']
var FILE_PNG = ['png', 'pns']
var FILE_PSD = ['psd', 'psb', 'pdd']
var FILE_TIFF = ['tif', 'tiff']

var BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
var BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
var BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

allowSelectionType(SELECT_PLACED)

createDialog('Select Links')

dialog.line = dialog.main.addHGroup()
dialog.line.alignChildren = 'top'

var dimension = dialog.line.addVPanel('Dimension')
dimension.width = dimension.addHGroup()
dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
dimension.widthEdit = dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
dimension.widthEdit.validateUnits()
dimension.widthEdit.active = true
dimension.height = dimension.addHGroup()
dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
dimension.heightEdit = dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
dimension.heightEdit.validateUnits()

var types = dialog.line.addVPanel('File types')
types.alignChildren = 'fill'
types.aiCheck = types.add('checkbox', undefined, getTypeString('Adobe Illustrator', FILE_AI))
types.pdfCheck = types.add('checkbox', undefined, getTypeString('Adobe PDF', FILE_PDF))
types.bmpCheck = types.add('checkbox', undefined, getTypeString('BMP', FILE_BMP))
types.gifCheck = types.add('checkbox', undefined, getTypeString('GIF89a', FILE_GIF))
types.jpegCheck = types.add('checkbox', undefined, getTypeString('JPEG', FILE_JPEG))
types.jpeg2000Check = types.add('checkbox', undefined, getTypeString('JPEG2000', FILE_JPEG2000))
types.pngCheck = types.add('checkbox', undefined, getTypeString('PNG', FILE_PNG))
types.psdCheck = types.add('checkbox', undefined, getTypeString('Photoshop', FILE_PSD))
types.tiffCheck = types.add('checkbox', undefined, getTypeString('TIFF', FILE_TIFF))

setNegativeButton('Cancel')
setPositiveButton('OK', function() {
    selectAll(function(item) {
        var condition = true
        var width = parseUnit(dimension.widthEdit.text)
        if (width > 0) condition = condition && parseInt(width) == parseInt(item.width)
        var height = parseUnit(dimension.heightEdit.text)
        if (height > 0) condition = condition && parseInt(height) == parseInt(item.height)

        var condition2 = false
        var extension = item.file.name.split('.').pop()
        if (types.aiCheck.value) condition2 = condition2 || contains(FILE_AI, extension)
        if (types.pdfCheck.value) condition2 = condition2 || contains(FILE_PDF, extension)
        if (types.bmpCheck.value) condition2 = condition2 || contains(FILE_BMP, extension)
        if (types.gifCheck.value) condition2 = condition2 || contains(FILE_GIF, extension)
        if (types.jpegCheck.value) condition2 = condition2 || contains(FILE_JPEG, extension)
        if (types.jpeg2000Check.value) condition2 = condition2 || contains(FILE_JPEG2000, extension)
        if (types.pngCheck.value) condition2 = condition2 || contains(FILE_PNG, extension)
        if (types.psdCheck.value) condition2 = condition2 || contains(FILE_PSD, extension)
        if (types.tiffCheck.value) condition2 = condition2 || contains(FILE_TIFF, extension)

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