#include '../../.stdlib/stdlib.js'
#include 'core-collections.js'
#include 'core-colors.js'
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

/**
 * Pick a folder.
 * @param {String} prompt title of the picker
 * @return {Folder}
 */
function openFolder(prompt) {
    return Folder.selectDialog(prompt)
}

/**
 * Pick single/multiple file.
 * @param {String} prompt title of the picker
 * @param {Array} filters e.g.: [['Illustrator', 'ai'], ['Photoshop', 'psd', 'psb', 'pdd']]
 * @param {Array} multiSelect set to true to pick multiple items, default is false.
 * @return {File}
 */
function openFile(prompt, filters, multiSelect) {
    var nativeFilters
    if (isMacOS()) {
        nativeFilters = function(file) {
            var condition = file instanceof Folder // required to go through directory
            filters.forEach(function(array) {
                array.slice(1).forEach(function(ext) {
                    condition = condition || file.extension() === ext.toLowerCase()
                })
            })
            return condition
        }
    } else {
        // expected filters = 'Adobe Illustrator:*.ai;Photoshop:*.psd,*.psb,*.pdd;'
        nativeFilters = ''
        var allExtensions = []
        filters.forEach(function(array) {
            check(array.length > 1, 'File extension required')
            var name = array.first()
            var extensions = array.slice(1)
            nativeFilters += name + ':*.' + extensions.join(';*.') + ','
            allExtensions = allExtensions.concat(extensions)
        })
        nativeFilters = 'All Formats:*.' + allExtensions.join(';*.') + ',' + nativeFilters
        if (nativeFilters.endsWith(',')) {
            nativeFilters = nativeFilters.substringBeforeLast(',')
        }
        $.writeln('Native filters = ' + nativeFilters)
    }
    return File.openDialog(prompt, nativeFilters, multiSelect === undefined ? false : multiSelect)
}