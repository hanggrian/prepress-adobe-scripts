/**
 * A file collection can be an array of files or just single PDF file.
 * @param {!Array<!File>} files
 */
function FileCollection(files) {
  checkNotNull(files)

  var self = this

  /** @type {boolean} */
  self.isSinglePDF = files.length === 1 && Collections.first(files).isPdf()

  /** @type {boolean} */
  self.hasPDF =
      Collections.any(files, function(it) {
        return it.isPdf()
      })

  /** @type {number} */
  self.length = files.length

  /**
   * Returns image file or PDF file with specific page.
   * @param {number} index index at which to retrieve file or PDF page.
   * @return {!File}
   */
  self.get =
      function(index) {
        var file = self.isSinglePDF ? Collections.first(files) : files[index]
        if (self.isSinglePDF) {
          preferences.setPDFPage(index)
        } else if (file.isPdf()) {
          preferences.setPDFPage(0)
        }
        return file
      }
}
