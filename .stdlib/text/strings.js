/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if text contains word.
 * @param {String} s expected prefix.
 * @returns {Boolean}
 */
String.prototype.includes = function(s) {
    return this.indexOf(s) !== -1
}

/**
 * Returns true if text starts with word.
 * @param {String} s expected prefix.
 * @returns {Boolean}
 */
String.prototype.startsWith = function(s) {
    return this.lastIndexOf(s, 0) === 0
}

/**
 * Returns true if text ends with word.
 * @param {String} s expected suffix.
 * @returns {Boolean}
 */
String.prototype.endsWith = function(s) {
    return this.indexOf(s, this.length - s.length) !== -1
}

/**
 * Returns prefix that ends with target.
 * @param {String} s target.
 * @returns {Boolean}
 */
String.prototype.substringBefore = function(s) {
    return this.substring(0, this.indexOf(s))
}

/**
 * Returns prefix that ends with last target.
 * @param {String} s target.
 * @returns {Boolean}
 */
String.prototype.substringBeforeLast = function(s) {
    return this.substring(0, this.lastIndexOf(s))
}

/**
 * Returns suffix that starts with target.
 * @param {String} s target.
 * @returns {Boolean}
 */
String.prototype.substringAfter = function(s) {
    return this.substring(this.indexOf(s) + s.length)
}

/**
 * Returns suffix that starts with last target.
 * @param {String} s target.
 * @returns {Boolean}
 */
String.prototype.substringAfterLast = function(s) {
    return this.substring(this.lastIndexOf(s) + s.length)
}

/**
 * Returns true if string is integer or decimal.
 * @returns {Boolean}
 */
String.prototype.isNumeric = function() {
     return /^-{0,1}\d*\.{0,1}\d+$/.test(this)
}

/** Remove leading whitespaces. */
String.prototype.trimStart = function() {
    return this.replace(/^\s\s*/, '')
}

/** Remove trailing whitespaces. */
String.prototype.trimEnd = function() {
    return this.replace(/\s\s*$/, '')
}

/** Remove leading and trailing whitespaces. */
String.prototype.trim = function() {
    return this.trimStart().trimEnd()
}