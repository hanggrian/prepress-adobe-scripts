/**
 * A file collection can be an array of files or just single PDF file.
 * @param {Array} files array of files.
 */
function FileCollection(files) {
  var self = this

  this.isSinglePDF = files.length === 1 && Collections.first(files).isPdf()

  this.hasPDF = Collections.any(files, function(it) { return it.isPdf() })

  this.length = files.length

  /**
   * Returns image file or PDF file with specific page.
   * @param {Number} index index at which to retrieve file or PDF page.
   * @returns {File}
   */
  this.get = function(index) {
    var file = self.isSinglePDF ? Collections.first(files) : files[index]
    if (self.isSinglePDF) {
      preferences.setPDFPage(index)
    } else if (file.isPdf()) {
      preferences.setPDFPage(0)
    }
    return file
  }
}
