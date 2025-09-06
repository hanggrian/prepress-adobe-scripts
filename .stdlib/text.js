/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Returns true if all characters of this string is uppercase.
 * @return {boolean}
 */
String.prototype.isUpperCase =
    function() {
      return this.toUpperCase() == this;
    };

/**
 * Returns true if all characters of this string is lowercase.
 * @return {boolean}
 */
String.prototype.isLowerCase =
    function() {
      return this.toLowerCase() == this;
    };

/**
 * Remove leading whitespaces.
 * @return {string}
 */
String.prototype.trimStart =
    function() {
      return this.replace(/^\s\s*/, '');
    };

/**
 * Remove trailing whitespaces.
 * @return {string}
 */
String.prototype.trimEnd =
    function() {
      return this.replace(/\s\s*$/, '');
    };

/**
 * Remove leading and trailing whitespaces.
 * @return {string}
 */
String.prototype.trim =
    function() {
      return this.trimStart().trimEnd();
    };

/**
 * Returns true if this string is empty.
 * @return {boolean}
 */
String.prototype.isEmpty =
    function() {
      return this.length === 0;
    };

/**
 * Returns true if this string is not empty.
 * @return {boolean}
 */
String.prototype.isNotEmpty =
    function() {
      return this.length > 0;
    };

/**
 * Returns true if this string is empty or all whitespaces.
 * @return {boolean}
 */
String.prototype.isBlank =
    function() {
      return this.isEmpty() || this.trim().isEmpty();
    };

/**
 * Returns true if this string is not empty and all whitespaces.
 * @return {boolean}
 */
String.prototype.isNotBlank =
    function() {
      return this.isNotEmpty() && this.trim().isNotEmpty();
    };

/**
 * Returns prefix that ends with target.
 * @param {string} substring
 * @return {string}
 */
String.prototype.substringBefore =
    function(substring) {
      return this.substring(0, this.indexOf(checkNotNull(substring)));
    };

/**
 * Returns prefix that ends with last target.
 * @param {string} substring
 * @return {string}
 */
String.prototype.substringBeforeLast =
    function(substring) {
      return this.substring(0, this.lastIndexOf(checkNotNull(substring)));
    };

/**
 * Returns suffix that starts with target.
 * @param {string} substring
 * @return {string}
 */
String.prototype.substringAfter =
    function(substring) {
      checkNotNull(substring);
      return this.substring(this.indexOf(substring) + substring.length);
    };

/**
 * Returns suffix that starts with last target.
 * @param {string} substring
 * @return {string}
 */
String.prototype.substringAfterLast =
    function(substring) {
      checkNotNull(substring);
      return this.substring(this.lastIndexOf(substring) + substring.length);
    };

/**
 * Returns true if text starts with word.
 * @param {string} substring
 * @return {boolean}
 */
String.prototype.startsWith =
    function(substring) {
      return this.lastIndexOf(checkNotNull(substring), 0) === 0;
    };

/**
 * Returns true if text ends with word.
 * @param {string} substring
 * @return {boolean}
 */
String.prototype.endsWith =
    function(substring) {
      checkNotNull(substring);
      return this.indexOf(substring, this.length - substring.length) !== -1;
    };

/**
 * Returns true if text contains word.
 * @param {string} substring
 * @return {boolean}
 */
String.prototype.contains =
    function(substring) {
      return this.indexOf(checkNotNull(substring)) !== -1;
    };

/**
 * Returns true if string is integer or decimal.
 * @return {boolean}
 */
String.prototype.isNumeric =
    function() {
      return /^-{0,1}\d*\.{0,1}\d+$/.test(this);
    };

/**
 * Returns a formatted string using varargs arguments.
 * @param {!Array<?Object>} arguments
 * @return {string}
 */
String.prototype.format =
    function() {
      return Internals.formatString(this, arguments);
    };
