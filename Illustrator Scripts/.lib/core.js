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
 * @param {RulerUnits} rulerUnits measurement used for the new document.
 * @param {Number} pages number of artboards.
 * @param {Number} width width of artboards.
 * @param {Number} height height of artboards.
 * @param {Number} bleed extra area around content, may be null.
 * @param {String} title new document name, may be null.
 * @return {Document}
 */
function addDocument(rulerUnits, pages, width, height, bleed, title) {
    return app.documents.addDocument(DocumentPresetType.Print, new DocumentPreset().let(function(it) {
        it.units = rulerUnits
        it.width = width
        it.height = height
        it.numArtboards = pages
        it.rasterResolution = DocumentRasterResolution.HighResolution
        if (bleed !== undefined && bleed > 0) {
            it.documentBleedLink = true
            it.documentBleedOffset = [bleed, bleed, bleed, bleed]
        }
        if (title !== undefined) {
            it.title = title
        }
        return it
    }))
}

/**
 * Set PDF file options for opening/relinking.
 * @param {Number} page PDF page to open.
 * @param {PDFBoxType} boxType cropping method, default is bounding box when left undefined.
 */
function setPDFPage(page, boxType) {
    app.preferences.PDFFileOptions.let(function(it) {
        it.pageToOpen = page
        it.pDFCropToBox = boxType !== undefined ? boxType : PDFBoxType.PDFBOUNDINGBOX 
    })
}