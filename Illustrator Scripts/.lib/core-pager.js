// A pager must attach itself to a document in order to iterate its artboards.

/** 
 * Construct a new One Side Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start starting page number, default is 1.
 */
 function OneSidePager(document, start) {
    var self = this
    var _current = start === undefined ? 1 : start

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard, _current++, _current++)
        })
    }

    this.bindArtboardName = function() {
        self.forEachArtboard(function(artboard, left, right) {
            artboard.name = left + '-' + right
        }) 
    }
}

/** 
 * Construct a new Perfect Binding Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start starting page number, default is 1.
 */
 function PerfectBindingPager(document, start) {
    var self = this
    var _current = start === undefined ? 1 : start
    var _isFront = true

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            if (_isFront) {
                action(artboard, _current, _current + 2)
            } else {
                action(artboard, _current + 1, _current - 1)
            }
            _current += 2
            _isFront = !_isFront
        })
    }

    this.bindArtboardName = function() {
        self.forEachArtboard(function(artboard, left, right) {
            artboard.name = left + '-' + right
        }) 
    }
}

/** 
 * Construct a new Saddle Stitch Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start starting page number, default is 1.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, start, end, isRtl) {
    var self = this
    var _start = start === undefined ? 1 : start
    var _end = end === undefined ? document.artboards.length * 2 : end
    var _isRtl = isRtl === undefined ? false : isRtl
    var _isFront = true

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            if (_isFront) {
                if (!_isRtl) {
                    action(artboard, _end, _start)
                } else {
                    action(artboard, _start, _end)
                }
            } else {
                if (!_isRtl) {
                    action(artboard, _start, _end)
                } else {
                    action(artboard, _end, _start)
                }
            }
            _start++
            _end--
            _isFront = !_isFront
        })
    }

    this.bindArtboardName = function() {
        self.forEachArtboard(function(artboard, left, right) {
            artboard.name = left + '-' + right
        }) 
    }
}