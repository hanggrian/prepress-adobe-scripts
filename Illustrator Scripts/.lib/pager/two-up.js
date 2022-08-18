/**
 * 2 pages of single-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpSimplexPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var left = current
      var right = current + 1
      artboard.name = "{0}-{1}".format(left + 1, right + 1)
      action(artboard,
        left, right)
      current += 2
    })
  }
}

/**
 * 2 pages of double-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpDuplexPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var left, right
      if (isFront) {
        left = current
        right = current + 2
      } else {
        left = current + 1
        right = current - 1
      }
      artboard.name = "{0}-{1}".format(left + 1, right + 1)
      action(artboard,
        left, right)
      current += 2
      isFront = !isFront
    })
  }
}

/**
 * 2 pages of single-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpSimplexCutStackPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var left = current
      var right = current + artboards
      artboard.name = "{0}-{1}".format(left + 1, right + 1)
      action(artboard,
        left, right)
      current++
    })
  }
}

/**
 * 2 pages of double-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function TwoUpDuplexCutStackPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var left, right
      if (isFront) {
        left = current
        right = current + artboards
      } else {
        left = current + artboards
        right = current
      }
      artboard.name = "{0}-{1}".format(left + 1, right + 1)
      action(artboard,
        left, right)
      current++
      isFront = !isFront
    })
  }
}
