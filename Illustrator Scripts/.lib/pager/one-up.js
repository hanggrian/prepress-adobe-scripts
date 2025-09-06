/**
 * One page layout.
 * @param {!Document} document use `document` for active document.
 * @param {number} start the first and default is 0.
 */
function OneUpPager(document, start) {
  checkNotNull(document);
  checkNotNull(start);
  check(start.isInt());
  var current = start;

  var self = this;
  self.index;

  /**
   * Iterate pager to next artboard, returning artboard's name.
   * @return {string}
   */
  self.next =
      function() {
        self.index = current++;
        return current.toString();
      };
}
