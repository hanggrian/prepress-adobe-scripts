/**
 * 4 pages of folding layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpFoldingPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var top1, top2, bottom1, bottom2
      if (isFront) {
        top1 = current + 7
        top2 = current + 4
        bottom1 = current
        bottom2 = current + 3
      } else {
        top1 = current + 1
        top2 = current + 2
        bottom1 = current - 2
        bottom2 = current - 3
      }
      artboard.name = "%d-%d-%d-%d".format(top1 + 1, top2 + 1, bottom1 + 1, bottom2 + 1)
      action(artboard,
        top1, top2,
        bottom1, bottom2)
      current += 4
      isFront = !isFront
    })
  }
}

/**
 * 4 pages of single-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var top1 = current
      var top2 = current + 1
      var bottom1 = current + 2
      var bottom2 = current + 3
      artboard.name = "%d-%d-%d-%d".format(top1 + 1, top2 + 1, bottom1 + 1, bottom2 + 1)
      action(artboard,
        top1, top2,
        bottom1, bottom2)
      current += 4
    })
  }
}

/**
 * 4 pages of double-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var top1, top2, bottom1, bottom2
      if (isFront) {
        top1 = current
        top2 = current + 2
        bottom1 = current + 4
        bottom2 = current + 6
      } else {
        top1 = current - 1
        top2 = current - 3
        bottom1 = current + 3
        bottom2 = current + 1
      }
      artboard.name = "%d-%d-%d-%d".format(top1 + 1, top2 + 1, bottom1 + 1, bottom2 + 1)
      action(artboard,
        top1, top2,
        bottom1, bottom2)
      current += 4
      isFront = !isFront
    })
  }
}

/**
 * 4 pages of single-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexStackPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var top1 = current
      var top2 = current + artboards
      var bottom1 = current + artboards * 2
      var bottom2 = current + artboards * 3
      artboard.name = "%d-%d-%d-%d".format(top1 + 1, top2 + 1, bottom1 + 1, bottom2 + 1)
      action(artboard,
        top1, top2,
        bottom1, bottom2)
      current++
    })
  }
}

/**
 * 4 pages of double-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexStackPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var top1, top2, bottom1, bottom2
      if (isFront) {
        top1 = current
        top2 = current + artboards
        bottom1 = current + artboards * 2
        bottom2 = current + artboards * 3
      } else {
        top1 = current + artboards
        top2 = current
        bottom1 = current + artboards * 3
        bottom2 = current + artboards * 2
      }
      artboard.name = "%d-%d-%d-%d".format(top1 + 1, top2 + 1, bottom1 + 1, bottom2 + 1)
      action(artboard,
        top1, top2,
        bottom1, bottom2)
      current++
      isFront = !isFront
    })
  }
}
