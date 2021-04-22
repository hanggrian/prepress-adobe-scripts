// A pager must attach itself to a document in order to iterate its artboards.

/** 
 * Construct a new One Side Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 */
 function OneSidePager(document, isPDF) {
    var self = this
    var _current = 0

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getLeftTitle = function() { return getLeft() + 1 }
    this.getRightTitle = function() { return getRight() + 1 }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _current += 2
        })
    }

    function getLeft() {
        return _current
    }

    function getRight() {
        return _current + 1
    }
}

/** 
 * Construct a new Perfect Binding Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 */
 function PerfectBindingPager(document, isPDF) {
    var self = this
    var _current = 0
    var _isFront = true

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getLeftTitle = function() { return getLeft() + 1 }
    this.getRightTitle = function() { return getRight() + 1 }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _current += 2
            _isFront = !_isFront
        })
    }

    function getLeft() {
        return _isFront
            ? _current
            : _current + 1
    }

    function getRight() {
        return _isFront
            ? _current + 2
            : _current - 1
    }
}

/** 
 * Construct a new Saddle Stitch Pager.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, end, isPDF, isRtl) {
    var self = this
    var _start = 0
    var _end = end === undefined ? document.artboards.length * 2 - 1 : end - 1
    var _isRtl = isRtl === undefined ? false : isRtl
    var _isFront = true

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getLeftTitle = function() { return getLeft() + 1 }
    this.getRightTitle = function() { return getRight() + 1 }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _start++
            _end--
            _isFront = !_isFront
        })
    }

    function getLeft() {
        return _isFront
            ? (!_isRtl ? _end : _start)
            : (!_isRtl ? _start : _end)
    }

    function getRight() {
        return _isFront
            ? (!_isRtl ? _start : _end)
            : (!_isRtl ? _end : _start)
    }
}