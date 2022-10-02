/**
 * 4 pages of folding layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpFoldingPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0
  var isFront = true

  var self = this
  self.top1, self.top2, self.bottom1, self.bottom2

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current + 7
      self.top2 = current + 4
      self.bottom1 = current
      self.bottom2 = current + 3
    } else {
      self.top1 = current + 1
      self.top2 = current + 2
      self.bottom1 = current - 2
      self.bottom2 = current - 3
    }
    current += 4
    isFront = !isFront
    return "%d-%d-%d-%d".format(self.top1 + 1, self.top2 + 1, self.bottom1 + 1, self.bottom2 + 1)
  }
}

/**
 * 4 pages of single-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0

  var self = this
  self.top1, self.top2, self.bottom1, self.bottom2

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    self.top1 = current
    self.top2 = current + 1
    self.bottom1 = current + 2
    self.bottom2 = current + 3
    current += 4
    return "%d-%d-%d-%d".format(self.top1 + 1, self.top2 + 1, self.bottom1 + 1, self.bottom2 + 1)
  }
}

/**
 * 4 pages of double-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0
  var isFront = true

  var self = this
  self.top1, self.top2, self.bottom1, self.bottom2

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current
      self.top2 = current + 2
      self.bottom1 = current + 4
      self.bottom2 = current + 6
    } else {
      self.top1 = current - 1
      self.top2 = current - 3
      self.bottom1 = current + 3
      self.bottom2 = current + 1
    }
    current += 4
    isFront = !isFront
    return "%d-%d-%d-%d".format(self.top1 + 1, self.top2 + 1, self.bottom1 + 1, self.bottom2 + 1)
  }
}

/**
 * 4 pages of single-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0

  var self = this
  self.top1, self.top2, self.bottom1, self.bottom2

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    self.top1 = current
    self.top2 = current + document.artboards.length
    self.bottom1 = current + document.artboards.length * 2
    self.bottom2 = current + document.artboards.length * 3
    current++
    return "%d-%d-%d-%d".format(self.top1 + 1, self.top2 + 1, self.bottom1 + 1, self.bottom2 + 1)
  }
}

/**
 * 4 pages of double-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start || 0
  var isFront = true

  var self = this
  self.top1, self.top2, self.bottom1, self.bottom2

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {String}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current
      self.top2 = current + document.artboards.length
      self.bottom1 = current + document.artboards.length * 2
      self.bottom2 = current + document.artboards.length * 3
    } else {
      self.top1 = current + document.artboards.length
      self.top2 = current
      self.bottom1 = current + document.artboards.length * 3
      self.bottom2 = current + document.artboards.length * 2
    }
    current++
    isFront = !isFront
    return "%d-%d-%d-%d".format(self.top1 + 1, self.top2 + 1, self.bottom1 + 1, self.bottom2 + 1)
  }
}
