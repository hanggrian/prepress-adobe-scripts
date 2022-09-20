// Like stdlib collections but recursively search within GroupItem.

/**
 * Iterate each element of this collection.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} action runnable to execute.
 */
Collections.forEachItem = function(items, action) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      Collections.forEachItem(items[i].pageItems, action)
    } else {
      action(items[i], i)
    }
  }
}

/**
 * Iterate each element of this collection as reversed.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} action runnable to execute.
 */
Collections.forEachItemReversed = function(items, action) {
  for (var i = Collections.lastIndex(items); i >= 0; i--) {
    if (items[i].typename === "GroupItem") {
      Collections.forEachItemReversed(items[i].pageItems, action)
    } else {
      action(items[i], i)
    }
  }
}

/**
 * First item of this collection, or given predicate when defined.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate optional consumer.
 * @return {Object}
 */
Collections.firstItem = function(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      return Collections.firstItem(items[i].pageItems, predicate)
    } else if (predicate(items[i], i)) {
      return items[i]
    }
  }
  error("Element not found given the predicate")
}

/**
 * Last item of this collection, or given predicate when defined.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate optional consumer.
 * @return {Object}
 */
Collections.lastItem = function(items, predicate) {
  for (var i = Collections.lastIndex(this); i >= 0; i--) {
    if (items[i].typename === "GroupItem") {
      return Collections.firstItem(items[i].pageItems, predicate)
    } else if (predicate(items[i], i)) {
      return items[i]
    }
  }
  error("Element not found given the predicate")
}

// TODO: Collections.firstItem
// TODO: Collections.lastItem

/**
 * Returns true if the collection has no elements matching predicate.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.noneItem = function(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      if (!Collections.noneItem(items[i].pageItems, predicate)) {
        return false
      }
    } else if (predicate(items[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns true if collection has at least one element matching predicate.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.anyItem = function(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      if (Collections.anyItem(items[i].pageItems, predicate)) {
        return true
      }
    } else if (predicate(items[i], i)) {
      return true
    }
  }
  return false
}

/**
 * Returns true if all elements in this collection match the predicate.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Boolean}
 */
Collections.allItem = function(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      if (!Collections.allItem(items[i].pageItems, predicate)) {
        return false
      }
    } else if (!predicate(items[i], i)) {
      return false
    }
  }
  return true
}

/**
 * Returns a list containing only elements matching the given predicate.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} predicate runnable with return value.
 * @return {Array}
 */
Collections.filterItem = function(items, predicate) {
  var result = []
  _filterItem(items, predicate, result)
  return result
}

function _filterItem(items, predicate, result) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      _filterItem(items[i].pageItems, predicate, result)
    } else {
      if (predicate(items[i], i)) {
        result.push(items[i])
      }
    }
  }
}

/**
 * Returns an array containing the results of applying the given transform function.
 * @param {Array|Object} items array or array-like object.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Collections.mapItem = function(items, transform) {
  var result = []
  _mapItem(items, transform, result)
  return result
}

function _mapItem(items, transform, result) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === "GroupItem") {
      _mapItem(items[i].pageItems, transform, result)
    } else {
      result.push(transform(items[i], i))
    }
  }
}
