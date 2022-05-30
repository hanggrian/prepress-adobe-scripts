/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function OneUpPager(document, start) {
  var _current = start || 0

  this.forEachArtboard = function(action) {
    document.artboards.forEach(function(artboard) {
      artboard.name = _current + 1
      action(artboard, _current++)
    })
  }
}