// Like stdlib collections but recursively search within GroupItem.

/**
 * Iterate each element of this collection.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEachItem = function(action) { _forEachItem(this, action) }

function _forEachItem(items, action) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      _forEachItem(items[i].pageItems, action)
    } else {
      action(items[i], i)
    }
  }
}

/**
 * Iterate each element of this collection as reversed.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEachItemReversed = function(action) { _forEachItemReversed(this, action) }

function _forEachItemReversed(items, action) {
  for (var i = items.lastIndex(); i >= 0; i--) {
    if (items[i].typename === 'GroupItem') {
      _forEachItemReversed(items[i].pageItems, action)
    } else {
      action(items[i], i)
    }
  }
}

/**
 * First item of this collection, or given predicate when defined.
 * @param {Function} predicate optional consumer.
 * @returns {Object}
 */
Object.prototype.firstItem = function(predicate) { return _firstItem(this, predicate) }

function _firstItem(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      return _firstItem(items[i].pageItems, predicate)
    } else if (predicate(items[i], i)) {
      return items[i]
    }
  }
  throw new Error('Element not found given the predicate')
}

/**
 * Last item of this collection, or given predicate when defined.
 * @param {Function} predicate optional consumer.
 * @returns {Object}
 */
Object.prototype.lastItem = function(predicate) { return _lastItem(this, predicate) }

function _lastItem(items, predicate) {
  for (var i = this.lastIndex(); i >= 0; i--) {
    if (items[i].typename === 'GroupItem') {
      return _firstItem(items[i].pageItems, predicate)
    } else if (predicate(items[i], i)) {
      return items[i]
    }
  }
  throw new Error('Element not found given the predicate')
}

// TODO: Object.prototype.firstItem
// TODO: Object.prototype.lastItem

/**
 * Returns true if the collection has no elements matching predicate.
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.noneItem = function(predicate) { return _noneItem(this, predicate) }

function _noneItem(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      if (!_noneItem(items[i].pageItems, predicate)) {
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
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.anyItem = function(predicate) { return _anyItem(this, predicate) }

function _anyItem(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      if (_anyItem(items[i].pageItems, predicate)) {
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
 * @param {Function} predicate runnable with return value.
 * @returns {Boolean}
 */
Object.prototype.allItem = function(predicate) { return _allItem(this, predicate) }

function _allItem(items, predicate) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      if (!_allItem(items[i].pageItems, predicate)) {
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
 * @param {Function} predicate runnable with return value.
 * @returns {Array}
 */
Object.prototype.filterItem = function(predicate) {
  var result = []
  _filterItem(this, predicate, result)
  return result
}

function _filterItem(items, predicate, result) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
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
 * @param {Function} transform runnable with return value.
 * @returns {Array}
 */
Object.prototype.mapItem = function(transform) {
  var result = []
  _mapItem(this, transform, result)
  return result
}

function _mapItem(items, transform, result) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].typename === 'GroupItem') {
      _mapItem(items[i].pageItems, transform, result)
    } else {
      result.push(transform(items[i], i))
    }
  }
}
