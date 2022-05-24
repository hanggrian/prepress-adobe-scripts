/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns an array containing the results of applying the given transform function.
 * @param {Function} transform runnable with return value.
 * @returns {Array}
 */
Object.prototype.map = function (transform) {
  var result = []
  for (var i = 0; i < this.length; i++) {
    result.push(transform(this[i], i))
  }
  return result
}

/**
 * Returns a single sequence of all elements from results of transform function being invoked on each element of original sequence.
 * @param {Function} transform runnable with return value.
 * @returns {Array}
 */
Object.prototype.flatMap = function (transform) {
  var result = []
  for (var i = 0; i < this.length; i++) {
    for (var j = 0; j < this[i].length; j++) {
      result.push(transform(this[i][j]))
    }
  }
  return result
}