/**
 * Returns file name without extension.
 * @return {String}
 */
File.prototype.nameWithoutExtension = function() {
    return unescape(this.name).substringBeforeLast('.')
}

/**
 * Returns file extension in lower-case without `.`.
 * @return {String}
 */
File.prototype.extension = function() {
    return unescape(this.name).substringAfterLast('.').toLowerCase()
}

/**
 * Returns true if this file is PDF type, and should be opened with `PDFFileOptions`.
 * Non-template Illustrator files are PDF-compatible.
 * @return {Boolean}
 */
File.prototype.isPDF = function() {
    var ext = this.extension()
    return ext === 'ai' || ext === 'pdf'
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
            allExtensions = allExtensions.addAll(extensions)
        })
        nativeFilters = 'All Formats:*.' + allExtensions.join(';*.') + ',' + nativeFilters
        if (nativeFilters.endsWith(',')) {
            nativeFilters = nativeFilters.substringBeforeLast(',')
        }
        $.writeln('Native filters = ' + nativeFilters)
    }
    return File.openDialog(prompt, nativeFilters, multiSelect === undefined ? false : multiSelect)
}