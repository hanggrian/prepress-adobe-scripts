/**
 * Apply relink once to all selected `PlacedItem`,
 * as opposed to native Illustrator `Relink...` which is done individually.
 */

#target Illustrator
#include '../../.rootlib/sui.js'
#include '../.lib/commons.js'

checkHasSelection()
selection.forEach(function(it) {
    checkTypename(it, 'PlacedItem')
})

var filters
if (isMacOS()) {
    filters = function (file) {
        return file instanceof Folder || 
            file.name.endsWith('.ai') || 
            file.name.endsWith('.pdf') || 
            file.name.endsWith('.bmp') || 
            file.name.endsWith('.gif') || 
            file.name.endsWith('.jpg') || file.name.endsWith('.jpe') || file.name.endsWith('.jpeg') || 
            file.name.endsWith('.jpf') || file.name.endsWith('.jpx') || file.name.endsWith('.jp2') || file.name.endsWith('.j2k') || file.name.endsWith('.j2c') || file.name.endsWith('.jpc') || 
            file.name.endsWith('.png') || file.name.endsWith('.pns') ||
            file.name.endsWith('.psd') || file.name.endsWith('.psb') || file.name.endsWith('.pdd') ||
            file.name.endsWith('.tif') || file.name.endsWith('.tiff')
    }
} else {
    filters = 'Adobe Illustrator:*.ai;' +
        'Adobe PDF:*.pdf;' +
        'BMP:*.bmp;' +
        'GIF89a:*.gif;' +
        'JPEG:*.jpg,*.jpe,*.jpeg;' +
        'JPEG2000:*.jpf,*.jpx,*.jp2,*.j2k,*.j2c,*.jpc;' +
        'PNG:*.png,*.pns;' +
        'Photoshop:*.psd,*.psb,*.pdd;' +
        'TIFF:*.tif,*.tiff;'
}

var file = File.openDialog('Relink All', filters)

if (file != null) {
    var dialog = new Dialog('Relink All')

    dialog.file = dialog.main.addHGroup('File')
    dialog.file.addText(undefined, decodeURI(file.absoluteURI))
    
    dialog.setNegativeButton('Cancel')
    dialog.setPositiveButton(function() {
        selection.forEach(function(it) {
            it.relink(file)
        })
    })
    dialog.show()   
}