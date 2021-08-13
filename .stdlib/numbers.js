/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns rounded number.
 * @returns {Number}
 */
Number.prototype.round = function() {
    return Math.round(this)
}

/**
 * Returns floored number.
 * @returns {Number}
 */
Number.prototype.floor = function() {
    return Math.floor(this)
}

/**
 * Returns ceiled number.
 * @returns {Number}
 */
Number.prototype.ceil = function() {
    return Math.ceil(this)
}

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