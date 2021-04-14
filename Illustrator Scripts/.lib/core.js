#include '../../.stdlib/stdlib.js'
#include 'core-collections.js'
#include 'core-colors.js'
#include 'core-pager.js'
#include 'core-resources.js'
#include 'core-units.js'

/**
 * Returns layer name, or type if it is unnamed.
 * @this {PageItem}
 * @return {String}
 */
Object.prototype.layerName = function() {
    var name = this.name
    if (name != null & name.length > 0) {
        return name
    }
    return this.typename
}

/**
 * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
 * @this {PageItem}
 * @return {PathItem}
 */
Object.prototype.getClippingPathItem = function() {
    if (this.typename === 'GroupItem' && this.clipped) {
        return this.pathItems[0]
    }
    return this
}

/**
 * Set PDF file options for opening/relinking.
 * @param {PDFBoxType} boxType cropping method.
 * @param {Number} page PDF page to open.
 */
function updatePDFPreferences(boxType, page) {
    var options = app.preferences.PDFFileOptions
    options.pDFCropToBox = boxType
    options.pageToOpen = page
}