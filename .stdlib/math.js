/**
 * Returns true if this number is odd.
 * @return {boolean}
 */
Number.prototype.isOdd = function() { return this & 1 }

/**
 * Returns true if this number is even.
 * @return {boolean}
 */
Number.prototype.isEven = function() { return !(this & 1) }

/**
 * Returns true if both numbers are the same after rounding.
 * @return {boolean}
 */
function isEqualRounded(number1, number2) {
  return Math.round(checkNotNull(number1)) === Math.round(checkNotNull(number2))
}
