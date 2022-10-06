/**
 * 2 pages of single-side layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function TwoUpSimplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    self.left = current
    self.right = current + 1
    current += 2
    return '%d-%d'.format(self.left + 1, self.right + 1)
  }
}

/**
 * 2 pages of double-side layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function TwoUpDuplexPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start
  var isFront = true

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    if (isFront) {
      self.left = current
      self.right = current + 2
    } else {
      self.left = current + 1
      self.right = current - 1
    }
    current += 2
    isFront = !isFront
    return '%d-%d'.format(self.left + 1, self.right + 1)
  }
}

/**
 * 2 pages of single-side layout with cut stack flow.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function TwoUpSimplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    self.left = current
    self.right = current + document.artboards.length
    current++
    return '%d-%d'.format(self.left + 1, self.right + 1)
  }
}

/**
 * 2 pages of double-side layout with cut stack flow.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function TwoUpDuplexStackPager(document, start) {
  checkNotNull(document)
  checkNotNull(start)
  var current = start
  var isFront = true

  var self = this
  self.left, self.right

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next = function() {
    if (isFront) {
      self.left = current
      self.right = current + document.artboards.length
    } else {
      self.left = current + document.artboards.length
      self.right = current
    }
    current++
    isFront = !isFront
    return '%d-%d'.format(self.left + 1, self.right + 1)
  }
}
