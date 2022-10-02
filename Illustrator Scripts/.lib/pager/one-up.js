/**
 * One page layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function OneUpPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0

  var self = this
  self.index

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    self.index = current++
    return current.toString()
  }
}
