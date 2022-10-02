/**
 * Booklet layout with saddle-stitch flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, start, end, isRtl) {
  checkNotNull(document)
  start = getOrDefault(start, 0)
  end = getOrDefault(end, document.artboards.length * 2 - 1)
  isRtl = getOrDefault(isRtl, false)
  var isFront = true

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    if (isFront) {
      if (!isRtl) {
        self.left = end
        self.right = start
      } else {
        self.left = start
        self.right = end
      }
    } else {
      if (!isRtl) {
        self.left = start
        self.right = end
      } else {
        self.left = end
        self.right = start
      }
    }
    start++
    end--
    isFront = !isFront
    return (self.left + 1) + "-" + (self.right + 1)
  }
}
