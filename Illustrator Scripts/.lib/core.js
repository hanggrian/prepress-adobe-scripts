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
 * Set PDF file while specifying its page.
 * @param {File} file source PDF file.
 * @param {Number} page PDF page, first page is 0.
 * @param {PDFBoxType} boxType optional cropping style.
 * @this {PlacedItem}
 */
Object.prototype.setPDFFile = function(file, page, boxType) {
    _updatePDFPref(page, boxType)
    this.file = file
}

/**
 * Relink PDF file while specifying its page.
 * @param {File} file source PDF file.
 * @param {Number} page PDF page, first page is 0.
 * @param {PDFBoxType} boxType optional cropping style.
 * @this {PlacedItem}
 */
Object.prototype.relinkPDF = function(file, page, boxType) {
    _updatePDFPref(page, boxType)
    this.relink(file)
}

function _updatePDFPref(page, boxType) {
    app.preferences.PDFFileOptions.let(function(it) {
        it.pageToOpen = page + 1
        it.pDFCropToBox = boxType !== undefined ? boxType : PDFBoxType.PDFBOUNDINGBOX 
    })
}