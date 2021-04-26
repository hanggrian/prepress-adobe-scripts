// A pager must attach itself to a document in order to iterate its artboards.

/** 
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 */
 function SimplexPager4(document, isPDF) {
    var _current = 0

    this.getTopLeftIndex = function() { return isPDF ? getTopLeft() + 1 : getTopLeft() }
    this.getTopRightIndex = function() { return isPDF ? getTopRight() + 1 : getTopRight() }
    this.getBottomLeftIndex = function() { return isPDF ? getBottomLeft() + 1 : getBottomLeft() }
    this.getBottomRightIndex = function() { return isPDF ? getBottomRight() + 1 : getBottomRight() }
    this.getArtboardTitle = function() { return (getTopLeft() + 1) + '-' + (getTopRight() + 1) + '-' + (getBottomLeft() + 1) + '-' + (getBottomRight() + 1) }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _current += 4
        })
    }

    function getTopLeft() { return _current }
    function getTopRight() { return _current + 1 }
    function getBottomLeft() { return _current + 2 }
    function getBottomRight() { return _current + 3 }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 */
 function SimplexPager2(document, isPDF) {
    var _current = 0

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getArtboardTitle = function() { return (getLeft() + 1) + '-' + (getRight() + 1) }
    
    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _current += 2
        })
    }
    
    function getLeft() { return _current }
    function getRight() { return _current + 1 }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 */
 function DuplexPager2(document, isPDF) {
    var _current = 0
    var _isFront = true

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getArtboardTitle = function() { return (getLeft() + 1) + '-' + (getRight() + 1) }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _current += 2
            _isFront = !_isFront
        })
    }

    function getLeft() { return _isFront ? _current : _current + 1 }
    function getRight() { return _isFront ? _current + 2 : _current - 1 }
}

/** 
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} end final page number, default is artboards' length times 2.
 * @param {Boolean} isPDF when set to true, the first page is 1.
 * @param {Boolean} isRtl useful for arabic layout, default is false.
 */
function SaddleStitchPager(document, end, isPDF, isRtl) {
    var _start = 0
    var _end = end === undefined ? document.artboards.length * 2 - 1 : end - 1
    var _isRtl = isRtl === undefined ? false : isRtl
    var _isFront = true

    this.getLeftIndex = function() { return isPDF ? getLeft() + 1 : getLeft() }
    this.getRightIndex = function() { return isPDF ? getRight() + 1 : getRight() }
    this.getArtboardTitle = function() { return (getLeft() + 1) + '-' + (getRight() + 1) }

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            action(artboard)
            _start++
            _end--
            _isFront = !_isFront
        })
    }

    function getLeft() { return _isFront ? (!_isRtl ? _end : _start) : (!_isRtl ? _start : _end) }
    function getRight() { return _isFront ? (!_isRtl ? _start : _end) : (!_isRtl ? _end : _start) }
}