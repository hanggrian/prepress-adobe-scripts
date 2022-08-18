/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns an array containing the results of applying the given transform function.
 * @param {Object} collection array or array-like objects.
 * @param {Function} transform runnable with return value.
 * @returns {Array}
 */
Collections.map = function(collection, transform) {
  var result = []
  for (var i = 0; i < collection.length; i++) {
    result.push(transform(collection[i], i))
  }
  return result
}

/**
 * Returns a single sequence of all elements from results of
 * transform function being invoked on each element of original sequence.
 * @param {Object} collection array or array-like objects.
 * @param {Function} transform runnable with return value.
 * @returns {Array}
 */
Collections.flatMap = function(collection, transform) {
  var result = []
  for (var i = 0; i < collection.length; i++) {
    for (var j = 0; j < collection[i].length; j++) {
      result.push(transform(collection[i][j]))
    }
  }
  return result
}
