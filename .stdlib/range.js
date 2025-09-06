/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Returns a range from start exclusive to end exclusive.
 * @param endExclusive non-decimal value.
 * @return {Range}
 */
Number.prototype.until =
    function(endExclusive) {
      return new Range(this - 1, endExclusive - 1);
    };

/**
 * Creates a range from starting point to end.
 * @param start {number} non-decimal value.
 * @param end {number} non-decimal value.
 */
function Range(start, end) {
  checkNotNull(start);
  check(start.isInt());
  checkNotNull(end);
  check(end.isInt());

  var self = this;

  /** @type {number} */
  self.start = start;

  /** @type {number} */
  self.startExclusive = start + 1;

  /** @type {number} */
  self.end = end;

  /** @type {number} */
  self.endExclusive = end + 1;

  /**
   * Returns size from start to end.
   * @return {number}
   */
  self.getLength =
      function() {
        return end - start + 1;
      };

  /**
   * Returns true if value is within range.
   * @param {number} value
   * @return {boolean}
   */
  self.contains =
      function(value) {
        return start <= value && value <= end;
      };

  /**
   * Iterate index from start to end.
   * @param {function(number)} action
   */
  self.forEachIndex =
      function(action) {
        for (var i = start; i < self.endExclusive; i++) {
          action(i);
        }
      };
}
