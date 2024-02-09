// Like stdlib collections but recursively search within GroupItem.

/**
 * Iterate each element of this collection.
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(!PageItem, number): undefined} action
 */
Collections.forEachItem =
    function(items, action) {
      checkNotNull(items)
      checkNotNull(action)
      for (var i = 0; i < items.length; i++) {
        if (Items.isGroup(items[i])) {
          Collections.forEachItem(items[i].pageItems, action)
        } else {
          action(items[i], i)
        }
      }
    }

/**
 * First item of this collection, or given predicate when defined.
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {!PageItem}
 */
Collections.firstItem =
    function(items, predicate) {
      checkNotNull(items)
      checkNotNull(predicate)
      for (var i = 0; i < items.length; i++) {
        if (Items.isGroup(items[i])) {
          return Collections.firstItem(items[i].pageItems, predicate)
        } else if (predicate(items[i], i)) {
          return items[i]
        }
      }
      error('Element not found given the predicate')
    }

/**
 * Last item of this collection, or given predicate when defined.
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {!PageItem}
 */
Collections.lastItem =
    function(items, predicate) {
      checkNotNull(predicate)
      for (var i = Collections.lastIndex(this); i >= 0; i--) {
        if (Items.isGroup(items[i])) {
          return Collections.firstItem(items[i].pageItems, predicate)
        } else if (predicate(items[i], i)) {
          return items[i]
        }
      }
      error('Element not found given the predicate')
    }

// TODO Collections.firstItem
// TODO Collections.lastItem

/**
 * Returns true if the collection has no elements matching predicate.
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {boolean}
 */
Collections.noneItem =
    function(items, predicate) {
      checkNotNull(items)
      checkNotNull(predicate)
      for (var i = 0; i < items.length; i++) {
        if (Items.isGroup(items[i])) {
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
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {boolean}
 */
Collections.anyItem =
    function(items, predicate) {
      checkNotNull(items)
      checkNotNull(predicate)
      for (var i = 0; i < items.length; i++) {
        if (Items.isGroup(items[i])) {
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
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {boolean}
 */
Collections.allItem =
    function(items, predicate) {
      checkNotNull(items)
      checkNotNull(predicate)
      for (var i = 0; i < items.length; i++) {
        if (Items.isGroup(items[i])) {
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
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(*, number): boolean} predicate
 * @return {!Array<!PageItem>}
 */
Collections.filterItem =
    function(items, predicate) {
      checkNotNull(items)
      checkNotNull(predicate)
      var result = []
      _filterItem(items, predicate, result)
      return result
    }

function _filterItem(items, predicate, result) {
  for (var i = 0; i < items.length; i++) {
    if (Items.isGroup(items[i])) {
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
 * @param {!Array<!PageItem>|!PageItems} items
 * @param {function(!PageItem): *} transform
 * @return {!Array<*>}
 */
Collections.mapItem =
    function(items, transform) {
      checkNotNull(items)
      checkNotNull(transform)
      var result = []
      _mapItem(items, transform, result)
      return result
    }

function _mapItem(items, transform, result) {
  for (var i = 0; i < items.length; i++) {
    if (Items.isGroup(items[i])) {
      _mapItem(items[i].pageItems, transform, result)
    } else {
      result.push(transform(items[i], i))
    }
  }
}
