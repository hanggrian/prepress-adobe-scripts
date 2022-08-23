/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this number is odd.
 * @returns {Boolean}
 */
Number.prototype.isOdd = function() { return this & 1 }

/**
 * Returns true if this number is even.
 * @returns {Boolean}
 */
Number.prototype.isEven = function() { return !(this & 1) }

/**
 * Returns floor number of this number.
 * @returns {Number}
 */
Number.prototype.floor = function() { return Math.floor(this) }

/**
 * Returns ceil number of this number.
 * @returns {Number}
 */
Number.prototype.ceil = function() { return Math.ceil(this) }

/**
 * Returns round number of this number.
 * @returns {Number}
 */
Number.prototype.round = function() { return Math.round(this) }

/**
 * Returns true if both numbers are the same after rounding.
 * @returns {Boolean}
 */
function isEqualRounded(number1, number2) { return number1.round() === number2.round() }

/**
 * Returns max number of `arguments`.
 * @returns {Number}
 */
function maxOf() {
  if (Collections.isEmpty(arguments)) {
    return
  }
  var max = arguments[0]
  for (var i = 1; i < arguments.length; i++) {
    if (max < arguments[i]) {
      max = arguments[i]
    }
  }
  return max
}
