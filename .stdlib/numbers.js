/**
 * Returns true if this number is odd.
 * @returns {Boolean}
 */
Number.prototype.isOdd = function() {
    return this & 1
}

/**
 * Returns true if this number is even.
 * @returns {Boolean}
 */
Number.prototype.isEven = function() {
    return !(this & 1)
}