/**
 * Returns true if text starts with word.
 * @param {String} s expected prefix
 * @return {Boolean}
 */
String.prototype.startsWith = function(s) {
    return this.lastIndexOf(s, 0) === 0
}

/**
 * Returns true if text ends with word.
 * @param {String} s expected suffix
 * @return {Boolean}
 */
String.prototype.endsWith = function(s) {
    return this.indexOf(s, this.length - s.length) !== -1
}

/**
 * Returns prefix that ends with target.
 * @param {String} s target
 * @return {Boolean}
 */
String.prototype.substringBefore = function(s) {
    return this.substring(0, this.indexOf(s))
}

/**
 * Returns suffix that starts with target.
 * @param {String} s target
 * @return {Boolean}
 */
String.prototype.substringAfter = function(s) {
    return this.substring(this.lastIndexOf(s) + 1)
}