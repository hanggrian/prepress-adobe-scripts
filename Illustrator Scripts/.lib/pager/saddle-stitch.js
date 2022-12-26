/**
 * Booklet layout with saddle-stitch flow.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 * @param {?number=} end default is artboards' length times 2.
 * @param {?boolean=} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, start, end, isRtl) {
  checkNotNull(document)
  checkNotNull(start)
  check(start.isInt())
  check(end.isInt())
  end = end || (document.artboards.length * 2 - 1)
  isRtl = isRtl || false
  var isFront = true

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
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
    return (self.left + 1) + '-' + (self.right + 1)
  }
}
