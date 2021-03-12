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