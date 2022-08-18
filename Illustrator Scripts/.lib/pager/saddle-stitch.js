/**
 * Booklet layout with saddle-stitch flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, start, end, isRtl) {
  var _start = start || 0
  var _end = end || document.artboards.length * 2 - 1
  var _isRtl = isRtl || false
  var _isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var left, right
      if (_isFront) {
        if (!_isRtl) {
          left = _end
          right = _start
        } else {
          left = _start
          right = _end
        }
      } else {
        if (!_isRtl) {
          left = _start
          right = _end
        } else {
          left = _end
          right = _start
        }
      }
      artboard.name = (left + 1) + "-" + (right + 1)
      action(artboard, left, right)
      _start++
      _end--
      _isFront = !_isFront
    })
  }
}
