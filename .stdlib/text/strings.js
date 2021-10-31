/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if this string is empty.
 * @returns {Boolean}
 */
String.prototype.isEmpty = function() { return this.length === 0 }

/**
 * Returns true if this string is not empty.
 * @returns {Boolean}
 */
String.prototype.isNotEmpty = function() { return this.length > 0 }

/**
 * Returns true if text contains word.
 * @param {String} substring expected prefix.
 * @returns {Boolean}
 */
String.prototype.includes = function(substring) {
    return this.indexOf(substring) !== -1
}

/**
 * Returns true if text starts with word.
 * @param {String} substring expected prefix.
 * @returns {Boolean}
 */
String.prototype.startsWith = function(substring) {
    return this.lastIndexOf(substring, 0) === 0
}

/**
 * Returns true if text ends with word.
 * @param {String} substring expected suffix.
 * @returns {Boolean}
 */
String.prototype.endsWith = function(substring) {
    return this.indexOf(substring, this.length - substring.length) !== -1
}

/**
 * Returns prefix that ends with target.
 * @param {String} substring target.
 * @returns {Boolean}
 */
String.prototype.substringBefore = function(substring) {
    return this.substring(0, this.indexOf(substring))
}

/**
 * Returns prefix that ends with last target.
 * @param {String} substring target.
 * @returns {Boolean}
 */
String.prototype.substringBeforeLast = function(substring) {
    return this.substring(0, this.lastIndexOf(substring))
}

/**
 * Returns suffix that starts with target.
 * @param {String} substring target.
 * @returns {Boolean}
 */
String.prototype.substringAfter = function(substring) {
    return this.substring(this.indexOf(substring) + substring.length)
}

/**
 * Returns suffix that starts with last target.
 * @param {String} substring target.
 * @returns {Boolean}
 */
String.prototype.substringAfterLast = function(substring) {
    return this.substring(this.lastIndexOf(substring) + substring.length)
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

String.prototype.format = function() { return _formatString(this, arguments) }

String.prototype.formatArr = function(arr) { return _formatString(this, arr) }

// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
function _formatString(s, args) {
    var formatted = s
    for (var i = 0; i < args.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi')
        formatted = formatted.replace(regexp, args[i])
    }
    return formatted
}