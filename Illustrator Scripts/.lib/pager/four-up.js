/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexPager(document, start) {
    var _current = start !== undefined ? start : 0

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var topLeft = _current
            var topRight = _current + 1
            var bottomLeft = _current + 2
            var bottomRight = _current + 3
            artboard.name = (topLeft + 1) + '-' + (topRight + 1) + '-' + (bottomLeft + 1) + '-' + (bottomRight + 1)
            action(artboard,
                topLeft, topRight,
                bottomLeft, bottomRight)
            _current += 4
        })
    }
}

/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexPager(document, start) {
    var _current = start !== undefined ? start : 0
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
            action(artboard,
                topLeft, topRight,
                bottomLeft, bottomRight)
            _current += 4
            _isFront = !_isFront
       })
   }
}