/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * First item of this collection, or given predicate when defined.
 * @param {Function} predicate optional consumer.
 * @returns {Object}
 */
Object.prototype.first = function(predicate) {
  if (predicate === undefined) {
    return this[0]
  }
  for (var i = 0; i < this.length; i++) {
    if (predicate(this[i], i)) {
      return this[i]
    }
  }
  error("Element not found given the predicate")
}

/**
 * Last item of this collection, or given predicate when defined.
 * @param {Function} predicate optional consumer.
 * @returns {Object}
 */
Object.prototype.last = function(predicate) {
  if (predicate === undefined) {
    return this[this.lastIndex()]
  }
  for (var i = this.lastIndex(); i >= 0; i--) {
    if (predicate(this[i], i)) {
      return this[i]
    }
  }
  error("Element not found given the predicate")
}

/**
 * Returns true if the collection has no elements matching predicate.
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.none = function(predicate) {
  for (var i = 0; i < this.length; i++) {
    if (predicate(this[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns true if collection has at least one element matching predicate.
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.any = function(predicate) {
  for (var i = 0; i < this.length; i++) {
    if (predicate(this[i], i)) {
      return true
    }
  }
  return false
}

/**
 * Returns true if all elements in this collection match the predicate.
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.all = function(predicate) {
  for (var i = 0; i < this.length; i++) {
    if (!predicate(this[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns a list containing only elements matching the given predicate.
 * @param {Function} predicate runnable with return value.
 * @returns {Array}
 */
Object.prototype.filter = function(predicate) {
  var result = []
  for (var i = 0; i < this.length; i++) {
    if (predicate(this[i], i)) {
      result.push(this[i])
    }
  }
  return result
}
