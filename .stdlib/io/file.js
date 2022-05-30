/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

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
    return it == 'ai' || it == 'pdf' // don't use ===
  })
}

/**
 * Reads the file content as a string.
 * @returns {String}
 */
File.prototype.readText = function() {
  return this.use('r', function(it) { return it.read() })
}

/**
 * Executes the given block function on this resource and then closes it down.
 * @param {String} openArg either 'r' or 'w', for read or write access
 * @param {Function} block action with return value
 * @returns {*}
 */
File.prototype.use = function(openArg, block) {
  this.open(openArg)
  var result = block(this)
  this.close()
  return result
}