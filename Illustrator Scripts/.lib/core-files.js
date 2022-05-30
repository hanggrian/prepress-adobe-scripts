/**
 * A file collection can be an array of files or just single PDF file.
 * @param {Array} files array of files.
 */
function FileCollection(files) {
  var self = this

  this.isSinglePDF = files.length === 1 && files.first().isPDF()

  this.hasPDF = files.any(function(it) { return it.isPDF() })

  this.length = files.length

  this.get = function(index) {
    var file = self.isSinglePDF ? files.first() : files[index]
    if (self.isSinglePDF) {
      preferences.setPDFPage(index)
    } else if (file.isPDF()) {
      preferences.setPDFPage(0)
    }
    return file
  }
}