/**
 * 8 pages of folding layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function EightUpFoldingPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start
  var isFront = true

  var self = this
  self.top1, self.top2, self.top3, self.top4, self.bottom1, self.bottom2, self.bottom3, self.bottom3

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current + 4
      self.top2 = current + 11
      self.top3 = current + 8
      self.top4 = current + 7
      self.bottom1 = current + 3
      self.bottom2 = current + 12
      self.bottom3 = current + 15
      self.bottom4 = current
    } else {
      self.top1 = current - 2
      self.top2 = current + 1
      self.top3 = current + 2
      self.top4 = current - 3
      self.bottom1 = current - 7
      self.bottom2 = current + 6
      self.bottom3 = current + 5
      self.bottom4 = current - 6
    }
    current += 8
    isFront = !isFront
    return '%d-%d-%d-%d-%d-%d-%d-%d'.format(self.top1 + 1, self.top2 + 1, self.top3 + 1, self.top4 + 1,
      self.bottom1 + 1, self.bottom2 + 1, self.bottom3 + 1, self.bottom4 + 1)
  }
}

/**
 * 8 pages of single-side layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function EightUpSimplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start

  var self = this
  self.top1, self.top2, self.top3, self.top4, self.bottom1, self.bottom2, self.bottom3, self.bottom3

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    self.top1 = current
    self.top2 = current + 1
    self.top3 = current + 2
    self.top4 = current + 3
    self.bottom1 = current + 4
    self.bottom2 = current + 5
    self.bottom3 = current + 6
    self.bottom4 = current + 7
    current += 8
    return '%d-%d-%d-%d-%d-%d-%d-%d'.format(self.top1 + 1, self.top2 + 1, self.top3 + 1, self.top4 + 1,
      self.bottom1 + 1, self.bottom2 + 1, self.bottom3 + 1, self.bottom4 + 1)
  }
}

/**
 * 8 pages of double-side layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function EightUpDuplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start
  var isFront = true

  var self = this
  self.top1, self.top2, self.top3, self.top4, self.bottom1, self.bottom2, self.bottom3, self.bottom3

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current
      self.top2 = current + 2
      self.top3 = current + 4
      self.top4 = current + 6
      self.bottom1 = current + 8
      self.bottom2 = current + 10
      self.bottom3 = current + 12
      self.bottom4 = current + 14
    } else {
      self.top1 = current - 1
      self.top2 = current - 3
      self.top3 = current - 5
      self.top4 = current - 7
      self.bottom1 = current + 7
      self.bottom2 = current + 5
      self.bottom3 = current + 3
      self.bottom4 = current + 1
    }
    current += 8
    isFront = !isFront
    return '%d-%d-%d-%d-%d-%d-%d-%d'.format(self.top1 + 1, self.top2 + 1, self.top3 + 1, self.top4 + 1,
      self.bottom1 + 1, self.bottom2 + 1, self.bottom3 + 1, self.bottom4 + 1)
  }
}

/**
 * 8 pages of single-side layout with cut stack flow.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function EightUpSimplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start

  var self = this
  self.top1, self.top2, self.top3, self.top4, self.bottom1, self.bottom2, self.bottom3, self.bottom3

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    self.top1 = current
    self.top2 = current + document.artboards.length
    self.top3 = current + document.artboards.length * 2
    self.top4 = current + document.artboards.length * 3
    self.bottom1 = current + document.artboards.length * 4
    self.bottom2 = current + document.artboards.length * 5
    self.bottom3 = current + document.artboards.length * 6
    self.bottom4 = current + document.artboards.length * 7
    current++
    return '%d-%d-%d-%d-%d-%d-%d-%d'.format(self.top1 + 1, self.top2 + 1, self.top3 + 1, self.top4 + 1,
      self.bottom1 + 1, self.bottom2 + 1, self.bottom3 + 1, self.bottom4 + 1)
  }
}

/**
 * 8 pages of double-side layout with cut stack flow.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function EightUpDuplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start
  var isFront = true

  var self = this
  self.top1, self.top2, self.top3, self.top4, self.bottom1, self.bottom2, self.bottom3, self.bottom3

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    if (isFront) {
      self.top1 = current
      self.top2 = current + document.artboards.length
      self.top3 = current + document.artboards.length * 2
      self.top4 = current + document.artboards.length * 3
      self.bottom1 = current + document.artboards.length * 4
      self.bottom2 = current + document.artboards.length * 5
      self.bottom3 = current + document.artboards.length * 6
      self.bottom4 = current + document.artboards.length * 7
    } else {
      self.top1 = current + document.artboards.length * 3
      self.top2 = current + document.artboards.length * 2
      self.top3 = current + document.artboards.length
      self.top4 = current
      self.bottom1 = current + document.artboards.length * 7
      self.bottom2 = current + document.artboards.length * 6
      self.bottom3 = current + document.artboards.length * 5
      self.bottom4 = current + document.artboards.length * 4
    }
    current++
    isFront = !isFront
    return '%d-%d-%d-%d-%d-%d-%d-%d'.format(self.top1 + 1, self.top2 + 1, self.top3 + 1, self.top4 + 1,
      self.bottom1 + 1, self.bottom2 + 1, self.bottom3 + 1, self.bottom4 + 1)
  }
}
