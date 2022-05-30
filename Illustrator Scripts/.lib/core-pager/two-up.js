/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpSimplexPager(document, start) {
  var current = start || 0

  this.forEachArtboard = function(action) {
    document.artboards.forEach(function(artboard) {
      var left = current
      var right = current + 1
      artboard.name = '{0}-{1}'.format(left + 1, right + 1)
      action(artboard,
        left, right)
      current += 2
    })
  }
}

/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpDuplexPager(document, start) {
  var current = start || 0
  var isFront = true

  this.forEachArtboard = function(action) {
    document.artboards.forEach(function(artboard) {
      var left, right
      if (isFront) {
        left = current
        right = current + 2
      } else {
        left = current + 1
        right = current - 1
      }
      artboard.name = '{0}-{1}'.format(left + 1, right + 1)
      action(artboard,
        left, right)
      current += 2
      isFront = !isFront
    })
  }
}

/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpSimplexCutStackPager(document, start) {
  var current = start || 0

  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    document.artboards.forEach(function(artboard) {
      var left = current
      var right = current + artboards
      artboard.name = '{0}-{1}'.format(left + 1, right + 1)
      action(artboard,
        left, right)
      current++
    })
  }
}

/**
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpDuplexCutStackPager(document, start) {
  var current = start || 0
  var isFront = true

  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    document.artboards.forEach(function(artboard) {
      var left, right
      if (isFront) {
        left = current
        right = current + artboards
      } else {
        left = current + artboards
        right = current
      }
      artboard.name = '{0}-{1}'.format(left + 1, right + 1)
      action(artboard,
        left, right)
      current++
      isFront = !isFront
    })
  }
}