/**
 * Select all PlacedItem with attributes matching user input.
 * When there are active selection, will only select items within those selection.
 */

#target Illustrator
#include '../.lib/sui/dialog.js'
#include '../.lib/preconditions.js'
#include '../.lib/select.js'
#include '../.lib/units.js'
#include '../.lib/validator.js'

const FILE_AI = ['ai']
const FILE_PDF = ['pdf']
const FILE_BMP = ['bmp']
const FILE_GIF = ['gif']
const FILE_JPEG = ['jpg', 'jpe', 'jpeg']
const FILE_JPEG2000 = ['jpf', 'jpx', 'jp2', 'j2k', 'j2c', 'jpc']
const FILE_PNG = ['png', 'pns']
const FILE_PSD = ['psd', 'psb', 'pdd']
const FILE_TIFF = ['tif', 'tiff']

const BOUNDS_DIMENSION_TEXT = [0, 0, 45, 21]
const BOUNDS_DIMENSION_EDIT = [0, 0, 100, 21]
const BOUNDS_COLOR_TEXT = [0, 0, 45, 21]

checkActiveDocument()

var document = app.activeDocument
var selection = document.selection

var dialog = Dialog('Select links')
dialog.root.alignChildren = 'top'

dialog.dimension = dialog.root.addPanel('Dimension')
dialog.dimension.width = dialog.dimension.add('group')
dialog.dimension.width.add('statictext', BOUNDS_DIMENSION_TEXT, 'Width:').justify = 'right'
dialog.dimension.widthEdit = dialog.dimension.width.add('edittext', BOUNDS_DIMENSION_EDIT)
dialog.dimension.widthEdit.validateUnits()
dialog.dimension.widthEdit.active = true
dialog.dimension.height = dialog.dimension.add('group')
dialog.dimension.height.add('statictext', BOUNDS_DIMENSION_TEXT, 'Height:').justify = 'right'
dialog.dimension.heightEdit = dialog.dimension.height.add('edittext', BOUNDS_DIMENSION_EDIT)
dialog.dimension.heightEdit.validateUnits()

dialog.file = dialog.root.addPanel('File types')
dialog.file.alignChildren = 'fill'
dialog.fileAi = dialog.file.add('checkbox', undefined, getTypeString('Adobe Illustrator', FILE_AI))
dialog.filePdf = dialog.file.add('checkbox', undefined, getTypeString('Adobe PDF', FILE_PDF))
dialog.fileBmp = dialog.file.add('checkbox', undefined, getTypeString('BMP', FILE_BMP))
dialog.fileGif = dialog.file.add('checkbox', undefined, getTypeString('GIF89a', FILE_GIF))
dialog.fileJpeg = dialog.file.add('checkbox', undefined, getTypeString('JPEG', FILE_JPEG))
dialog.fileJpeg2000 = dialog.file.add('checkbox', undefined, getTypeString('JPEG2000', FILE_JPEG2000))
dialog.filePng = dialog.file.add('checkbox', undefined, getTypeString('PNG', FILE_PNG))
dialog.filePsd = dialog.file.add('checkbox', undefined, getTypeString('Photoshop', FILE_PSD))
dialog.fileTiff = dialog.file.add('checkbox', undefined, getTypeString('TIFF', FILE_TIFF))

dialog.onAction(function() {
    selectItems([SELECT_PLACED], function(item) {
        var extension = item.file.name.split('.').pop()
        var condition = true
        
        var width = parseUnit(dialog.dimension.widthEdit.text)
        if (width > 0) {
            condition = condition && parseInt(width) == parseInt(item.width)
        }
        var height = parseUnit(dialog.dimension.heightEdit.text)
        if (height > 0) {
            condition = condition && parseInt(height) == parseInt(item.height)
        }
        if (dialog.fileAi.value) {
            condition = condition && contains(FILE_AI, extension)
        }
        if (dialog.filePdf.value) {
            condition = condition && contains(FILE_PDF, extension)
        }
        if (dialog.fileBmp.value) {
            condition = condition && contains(FILE_BMP, extension)
        }
        if (dialog.fileGif.value) {
            condition = condition && contains(FILE_GIF, extension)
        }
        if (dialog.fileJpeg.value) {
            condition = condition && contains(FILE_JPEG, extension)
        }
        if (dialog.fileJpeg2000.value) {
            condition = condition && contains(FILE_JPEG2000, extension)
        }
        if (dialog.filePng.value) {
            condition = condition && contains(FILE_PNG, extension)
        }
        if (dialog.filePsd.value) {
            condition = condition && contains(FILE_PSD, extension)
        }
        if (dialog.fileTiff.value) {
            condition = condition && contains(FILE_TIFF, extension)
        }

        return condition
    })
})
dialog.show()

function getTypeString(prefix, suffix) {
    var s = ''
    for (var i = 0; i < suffix.length; i++) {
        s += suffix[i]
        if (i != suffix.length - 1) {
            s += ', '
        }
    }
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