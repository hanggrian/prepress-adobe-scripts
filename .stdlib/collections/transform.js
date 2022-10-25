/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns an array containing the results of applying the given transform function.
 * @param {!Array<*>|!PageItems} collection
 * @param {function(*, number): *} transform
 * @return {!Array<*>}
 */
Collections.map = function(collection, transform) {
  checkNotNull(transform)
  var result = []
  Collections.forEach(collection, function(element, i) {
    result.push(transform(element, i))
  })
  return result
}

/**
 * Returns a single sequence of all elements from results of transform function being invoked on
 * each element of original sequence.
 * @param {!Array<*>|!PageItems} collection
 * @param {function(*): *} transform
 * @return {!Array<*>}
 */
Collections.flatMap = function(collection, transform) {
  checkNotNull(transform)
  var result = []
  Collections.forEach(collection, function(collection2) {
    Collections.forEach(collection2, function(element) {
      result.push(transform(element))
    })
  })
  return result
}
