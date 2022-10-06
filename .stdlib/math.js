/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

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
 * Returns floor number of this number.
 * @return {number}
 */
Number.prototype.floor = function() { return Math.floor(this) }

/**
 * Returns ceil number of this number.
 * @return {number}
 */
Number.prototype.ceil = function() { return Math.ceil(this) }

/**
 * Returns round number of this number.
 * @return {number}
 */
Number.prototype.round = function() { return Math.round(this) }

/**
 * Returns true if both numbers are the same after rounding.
 * @return {boolean}
 */
function isEqualRounded(number1, number2) { return checkNotNull(number1).round() === checkNotNull(number2).round() }
