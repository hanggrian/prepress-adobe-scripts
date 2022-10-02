/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * First item of this collection, or given predicate when defined.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate optional consumer.
 * @return {Object}
 */
Collections.first = function(collection, predicate) {
  checkNotNull(collection)
  if (predicate === undefined) {
    return collection[0]
  }
  for (var i = 0; i < collection.length; i++) {
    if (predicate(collection[i], i)) {
      return collection[i]
    }
  }
  error("Element not found given the predicate")
}

/**
 * Last item of this collection, or given predicate when defined.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate optional consumer.
 * @return {Object}
 */
Collections.last = function(collection, predicate) {
  if (predicate === undefined) {
    return collection[Collections.lastIndex(collection)]
  }
  for (var i = Collections.lastIndex(collection); i >= 0; i--) {
    if (predicate(collection[i], i)) {
      return collection[i]
    }
  }
  error("Element not found given the predicate")
}

/**
 * Returns true if the collection has no elements matching predicate.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.none = function(collection, predicate) {
  checkNotNull(collection)
  checkNotNull(predicate)
  for (var i = 0; i < collection.length; i++) {
    if (predicate(collection[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns true if collection has at least one element matching predicate.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.any = function(collection, predicate) {
  checkNotNull(collection)
  checkNotNull(predicate)
  for (var i = 0; i < collection.length; i++) {
    if (predicate(collection[i], i)) {
      return true
    }
  }
  return false
}

/**
 * Returns true if all elements in this collection match the predicate.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.all = function(collection, predicate) {
  checkNotNull(collection)
  checkNotNull(predicate)
  for (var i = 0; i < collection.length; i++) {
    if (!predicate(collection[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns a list containing only elements matching the given predicate.
 * @param {Array|Object} collection array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Array}
 */
Collections.filter = function(collection, predicate) {
  checkNotNull(predicate)
  var result = []
  Collections.forEach(collection, function(element, i) {
    if (predicate(element, i)) {
      result.push(element)
    }
  })
  return result
}
