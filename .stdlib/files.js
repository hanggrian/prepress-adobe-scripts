/**
 * Returns true if both files point to the same location.
 * @returns {Boolean}
 */
File.prototype.equalTo = function(other) {
    return this.absoluteURI === other.absoluteURI
}

/**
 * Returns file name without extension.
 * @returns {String}
 */
File.prototype.getNameWithoutExtension = function() {
    return unescape(this.name).substringBeforeLast('.')
}

/**
 * Returns file extension in lower-case without `.`.
 * @returns {String}
 */
File.prototype.getExtension = function() {
    return unescape(this.name).substringAfterLast('.').toLowerCase()
}

/**
 * Returns true if this file is PDF type, and should be opened with `PDFFileOptions`.
 * Non-template Illustrator files are PDF-compatible.
 * @returns {Boolean}
 */
File.prototype.isPDF = function() {
    return this.getExtension().let(function(it) {
        return it == 'ai' || it == 'pdf'
    })
}

/**
 * Pick a folder.
 * @param {String} prompt title of the picker.
 * @returns {Folder}
 */
function openFolder(prompt) {
    return Folder.selectDialog(prompt)
}

/**
 * Pick single/multiple file.
 * @param {String} prompt title of the picker.
 * @param {Array} filters e.g.: [['Illustrator', 'ai'], ['Photoshop', 'psd', 'psb', 'pdd']].
 * @param {Array} multiSelect set to true to pick multiple items, default is false.
 * @returns {File}
 */
function openFile(prompt, filters, multiSelect) {
    var nativeFilters
    if (isMacOS()) {
        nativeFilters = function(file) {
            var condition = file instanceof Folder // required to go through directory
            filters.forEach(function(array) {
                array.slice(1).forEach(function(ext) {
                    condition = condition || file.getExtension() === ext.toLowerCase()
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