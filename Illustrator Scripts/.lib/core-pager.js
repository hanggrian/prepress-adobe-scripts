// A pager must attach itself to a document in order to iterate its artboards.

/** 
 * @param {Document} document to attach to, use `document` for active document.
 */
function FourUpSimplexPager(document) {
    var _current = 0

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var topLeft = _current
            var topRight = _current + 1
            var bottomLeft = _current + 2
            var bottomRight = _current + 3
            artboard.name = (topLeft + 1) + '-' + (topRight + 1) + '-' + (bottomLeft + 1) + '-' + (bottomRight + 1)
            action(artboard, topLeft, topRight, bottomLeft, bottomRight)
            _current += 4
        })
    }
}

function FourUpDuplexPager(document) {
   var _current = 0
   var _isFront = true

   this.forEachArtboard = function(action) {
       document.artboards.forEach(function(artboard) {
            var topLeft, topRight, bottomLeft, bottomRight
            if (_isFront) {
                topLeft = _current
                topRight = _current + 2
                bottomLeft = _current + 4
                bottomRight = _current + 6
            } else {
                topLeft = _current - 1
                topRight = _current - 3
                bottomLeft = _current + 3
                bottomRight = _current + 1
            }
           artboard.name = (topLeft + 1) + '-' + (topRight + 1) + '-' + (bottomLeft + 1) + '-' + (bottomRight + 1)
           action(artboard, topLeft, topRight, bottomLeft, bottomRight)
           _current += 4
           _isFront = !_isFront
       })
   }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 */
function TwoUpSimplexPager(document) {
    var _current = 0

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var left = _current
            var right = _current + 1
            artboard.name = (left + 1) + '-' + (right + 1)
            action(artboard, left, right)
            _current += 2
        })
    }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 */
function TwoUpDuplexPager(document) {
    var _current = 0
    var _isFront = true

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var left, right
            if (_isFront) {
                left = _current
                right = _current + 2
            } else {
                left = _current + 1
                right = _current - 1
            }
            artboard.name = (left + 1) + '-' + (right + 1)
            action(artboard, left, right)
            _current += 2
            _isFront = !_isFront
        })
    }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 */
function PerfectBoundPager(document) {
    var _current = 0

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            artboard.name = _current + 1
            action(artboard, _current++)
        })
    }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, end, isRtl) {
    var _start = 0
    var _end = end === undefined ? document.artboards.length * 2 - 1 : end - 1
    var _isRtl = isRtl === undefined ? false : isRtl
    var _isFront = true

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
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
            artboard.name = (left + 1) + '-' + (right + 1)
            action(artboard, left, right)
            _start++
            _end--
            _isFront = !_isFront
        })
    }
}