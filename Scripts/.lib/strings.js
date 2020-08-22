String.prototype.startsWith || (String.prototype.startsWith = function(word) {
    return this.lastIndexOf(word, 0) === 0;
});

String.prototype.endsWith || (String.prototype.endsWith = function(word) {
    return this.indexOf(word, this.length - word.length) !== -1;
});