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