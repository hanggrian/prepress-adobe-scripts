/**
 * Returns true if this number is odd.
 * @return {Boolean}
 */
Number.prototype.isOdd = function() {
    return this & 1
}

/**
 * Returns true if this number is even.
 * @return {Boolean}
 */
Number.prototype.isEven = function() {
    return !(this & 1)
}