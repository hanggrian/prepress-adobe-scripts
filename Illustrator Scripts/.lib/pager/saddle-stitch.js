/**
 * Booklet layout with saddle-stitch flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, start, end, isRtl) {
  start = start || 0
  end = end || document.artboards.length * 2 - 1
  isRtl = isRtl || false
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var left, right
      if (isFront) {
        if (!isRtl) {
          left = end
          right = start
        } else {
          left = start
          right = end
        }
      } else {
        if (!isRtl) {
          left = start
          right = end
        } else {
          left = end
          right = start
        }
      }
      artboard.name = (left + 1) + "-" + (right + 1)
      action(artboard, left, right)
      start++
      end--
      isFront = !isFront
    })
  }
}
