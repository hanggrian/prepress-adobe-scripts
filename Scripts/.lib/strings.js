/** Return true if text starts with specified word. */
String.prototype.startsWith || (String.prototype.startsWith = function(word) {
    return this.lastIndexOf(word, 0) === 0;
});

/** Return true if text ends with specified word. */
String.prototype.endsWith || (String.prototype.endsWith = function(word) {
    return this.indexOf(word, this.length - word.length) !== -1;
});