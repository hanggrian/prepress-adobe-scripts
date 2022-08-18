/**
 * 8 pages of single-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpSimplexPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var top1 = current
      var top2 = current + 1
      var top3 = current + 2
      var top4 = current + 3
      var bottom1 = current + 4
      var bottom2 = current + 5
      var bottom3 = current + 6
      var bottom4 = current + 7
      artboard.name = "{0}-{1}-{2}-{3}-{4}-{5}-{6}-{7}".format(top1 + 1, top2 + 1, top3 + 1, top4 + 1, bottom1 + 1, bottom2 + 1, bottom3 + 1, bottom4 + 1)
      action(artboard,
        top1, top2, top3, top4,
        bottom1, bottom2, bottom3, bottom4)
      current += 8
    })
  }
}

/**
 * 8 pages of double-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpDuplexPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var top1, top2, top3, top4, bottom1, bottom2, bottom3, bottom3
      if (isFront) {
        top1 = current
        top2 = current + 2
        top3 = current + 4
        top4 = current + 6
        bottom1 = current + 8
        bottom2 = current + 10
        bottom3 = current + 12
        bottom4 = current + 14
      } else {
        top1 = current - 1
        top2 = current - 3
        top3 = current - 5
        top4 = current - 7
        bottom1 = current + 7
        bottom2 = current + 5
        bottom3 = current + 3
        bottom4 = current + 1
      }
      artboard.name = "{0}-{1}-{2}-{3}-{4}-{5}-{6}-{7}".format(top1 + 1, top2 + 1, top3 + 1, top4 + 1, bottom1 + 1, bottom2 + 1, bottom3 + 1, bottom4 + 1)
      action(artboard,
        top1, top2, top3, top4,
        bottom1, bottom2, bottom3, bottom4)
      current += 8
      isFront = !isFront
    })
  }
}

/**
 * 8 pages of single-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpSimplexCutStackPager(document, start) {
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
      var top3 = current + artboards * 2
      var top4 = current + artboards * 3
      var bottom1 = current + artboards * 4
      var bottom2 = current + artboards * 5
      var bottom3 = current + artboards * 6
      var bottom4 = current + artboards * 7
      artboard.name = "{0}-{1}-{2}-{3}-{4}-{5}-{6}-{7}".format(top1 + 1, top2 + 1, top3 + 1, top4 + 1, bottom1 + 1, bottom2 + 1, bottom3 + 1, bottom4 + 1)
      action(artboard,
        top1, top2, top3, top4,
        bottom1, bottom2, bottom3, bottom4)
      current++
    })
  }
}

/**
 * 8 pages of double-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function EightUpDuplexCutStackPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var top1, top2, top3, top4, bottom1, bottom2, bottom3, bottom3
      if (isFront) {
        top1 = current
        top2 = current + artboards
        top3 = current + artboards * 2
        top4 = current + artboards * 3
        bottom1 = current + artboards * 4
        bottom2 = current + artboards * 5
        bottom3 = current + artboards * 6
        bottom4 = current + artboards * 7
      } else {
        top1 = current + artboards * 3
        top2 = current + artboards * 2
        top3 = current + artboards
        top4 = current
        bottom1 = current + artboards * 7
        bottom2 = current + artboards * 6
        bottom3 = current + artboards * 5
        bottom4 = current + artboards * 4
      }
      artboard.name = "{0}-{1}-{2}-{3}-{4}-{5}-{6}-{7}".format(top1 + 1, top2 + 1, top3 + 1, top4 + 1, bottom1 + 1, bottom2 + 1, bottom3 + 1, bottom4 + 1)
      action(artboard,
        top1, top2, top3, top4,
        bottom1, bottom2, bottom3, bottom4)
      current++
      isFront = !isFront
    })
  }
}
