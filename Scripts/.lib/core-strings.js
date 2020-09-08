#include 'core.js'

/**
 * Returns true if text starts with word.
 * @param {String} word - expected prefix
 * @return {Boolean}
 */
String.prototype.startsWith = function(word) { return this.lastIndexOf(word, 0) === 0 }

/**
 * Returns true if text ends with word.
 * @param {String} word - expected suffix
 * @return {Boolean}
 */
String.prototype.endsWith = function(word) { return this.indexOf(word, this.length - word.length) !== -1 }