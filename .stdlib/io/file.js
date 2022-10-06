/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if both files point to the same location.
 * @return {boolean}
 */
File.prototype.equalTo = function(other) { return this.absoluteURI === checkNotNull(other).absoluteURI }

/**
 * Returns file name without extension.
 * @return {string}
 */
File.prototype.getNameWithoutExtension = function() { return unescape(this.name).substringBeforeLast('.') }

/**
 * Returns file extension in lower-case without `.`.
 * @return {string}
 */
File.prototype.getExtension = function() { return unescape(this.name).substringAfterLast('.').toLowerCase() }

/**
 * Returns true if this file is PDF type, and should be opened with `PDFFileOptions`.
 * Non-template Illustrator files are PDF-compatible.
 * @return {boolean}
 */
File.prototype.isPdf = function() {
  var extension = this.getExtension()
  return extension === 'ai' || extension === 'pdf'
}

/**
 * Reads the file content as a string.
 * @param {string=} charset default is `UTF-8`.
 * @return {string}
 */
File.prototype.readText = function(charset) {
  charset = charset || 'UTF-8'
  return this.use('r', function(it) {
    it.charset = charset
    return it.read()
  })
}

/**
 * Writes string content to file.
 * @param {string} content
 * @param {string=} charset default is `UTF-8`.
 */
File.prototype.writeText = function(content, charset) {
  charset = charset || 'UTF-8'
  this.use('w', function(it) {
    it.charset = charset
    it.write(content)
  })
}

/**
 * Executes the given block function on this resource and then closes it down.
 * @param {string} openArg either 'r' or 'w', for read or write access.
 * @param {function(!File): *} block
 * @return {*}
 */
File.prototype.use = function(openArg, block) {
  checkNotNull(openArg)
  checkNotNull(block)
  this.open(openArg)
  this.lineFeed = 'Unix'
  var result = block(this)
  this.close()
  return result
}
