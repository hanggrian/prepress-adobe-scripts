/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Returns true if this number is odd.
 * @return {boolean}
 */
Number.prototype.isOdd =
    function() {
      return this & 1
    }

/**
 * Returns true if this number is even.
 * @return {boolean}
 */
Number.prototype.isEven =
    function() {
      return !(this & 1)
    }

/**
 * Returns true if no decimal value in place.
 * @return {boolean}
 */
Number.prototype.isInt =
    function() {
      return parseInt(this) == this
    }
