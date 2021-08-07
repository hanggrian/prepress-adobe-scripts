/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpSimplexPager(document, start) {
    var _current = start || 0

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var top1 = _current
            var top2 = _current + 1
            var top3 = _current + 2
            var top4 = _current + 3
            var bottom1 = _current + 4
            var bottom2 = _current + 5
            var bottom3 = _current + 6
            var bottom4 = _current + 7
            artboard.name = (top1 + 1) + '-' + (top2 + 1) + '-' + (top3 + 1) + '-' + (top4 + 1) + '-' + (bottom1 + 1) + '-' + (bottom2 + 1) + '-' + (bottom3 + 1) + '-' + (bottom4 + 1)
            action(artboard,
                top1, top2, top3, top4,
                bottom1, bottom2, bottom3, bottom4)
            _current += 8
        })
    }
}

/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpDuplexPager(document, start) {
    var _current = start || 0
    var _isFront = true

    this.forEachArtboard = function(action) {
        document.artboards.forEach(function(artboard) {
            var top1, top2, top3, top4, bottom1, bottom2, bottom3, bottom3
            if (_isFront) {
                top1 = _current
                top2 = _current + 2
                top3 = _current + 4
                top4 = _current + 6
                bottom1 = _current + 8
                bottom2 = _current + 10
                bottom3 = _current + 12
                bottom4 = _current + 14
            } else {
                top1 = _current - 1
                top2 = _current - 3
                top3 = _current - 5
                top4 = _current - 7
                bottom1 = _current + 7
                bottom2 = _current + 5
                bottom3 = _current + 3
                bottom4 = _current + 1
            }
            artboard.name = (top1 + 1) + '-' + (top2 + 1) + '-' + (top3 + 1) + '-' + (top4 + 1) + '-' + (bottom1 + 1) + '-' + (bottom2 + 1) + '-' + (bottom3 + 1) + '-' + (bottom4 + 1)
            action(artboard,
                top1, top2, top3, top4,
                bottom1, bottom2, bottom3, bottom4)
            _current += 8
            _isFront = !_isFront
        })
    }
}