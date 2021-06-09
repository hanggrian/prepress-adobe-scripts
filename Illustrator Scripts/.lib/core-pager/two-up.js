/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpSimplexPager(document, start) {
    var _current = start !== undefined ? start : 0

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
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpDuplexPager(document, start) {
    var _current = start !== undefined ? start : 0
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