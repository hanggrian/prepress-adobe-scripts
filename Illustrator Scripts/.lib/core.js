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
Object.prototype.getLayerName = function() {
    return this.name != null & this.name.length > 0 ? this.name : this.typename
}

/**
 * Returns the clipping path of this clip group, or the item itself if this is not a clip group.
 * @this {PageItem}
 * @return {PathItem}
 */
Object.prototype.getClippingPathItem = function() {
    if (this.typename === 'GroupItem' && this.clipped) {
        // can't use `first { }` because PathItems is not an Array
        for (var i = 0; i < this.pathItems.length; i++) {
            var pathItem = this.pathItems[i]
            if (pathItem.clipping) {
                return pathItem
            }
        }
    }
    return this
}

/**
 * Set PDF file options for opening/relinking.
 * @param {PDFBoxType} boxType cropping method.
 * @param {Number} page PDF page to open.
 */
function updatePDFPreferences(boxType, page) {
    app.preferences.PDFFileOptions.let(function(it) {
        it.pDFCropToBox = boxType
        it.pageToOpen = page
    })
}