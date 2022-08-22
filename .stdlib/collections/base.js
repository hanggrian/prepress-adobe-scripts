/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Static helper class for any array-like objects.
 * This is due to Adobe's custom non-array collection objects like `Artboards`, `PageItems`, etc.
 */
var Collections = {

  EMPTY_ARRAY: [],

  /**
   * Last index of this collection.
   * @param {Object} collection array or array-like objects.
   * @param {Object} element value within this collection.
   * @returns {Boolean}
   */
  indexOf: function(collection, element) {
    for (var i = 0; i < collection.length; i++) {
      if (collection[i] == element) {
        return i
      }
    }
    error("Element not found in this collection")
  },

  /**
   * Last index of this collection.
   * @param {Object} collection array or array-like objects.
   * @returns {Boolean}
   */
  lastIndex: function(collection) { return collection.length - 1 },

  /**
   * Returns true if this collection is empty.
   * @param {Object} collection array or array-like objects.
   * @returns {Boolean}
   */
  isEmpty: function(collection) { return collection.length === 0 },

  /**
   * Returns true if this collection is not empty.
   * @param {Object} collection array or array-like objects.
   * @returns {Boolean}
   */
  isNotEmpty: function(collection) { return collection.length > 0 },

  /**
   * Returns true if element belongs in this collection.
   * @param {Object} collection array or array-like objects.
   * @returns {Boolean}
   */
  contains: function(collection, element) {
    var i = collection.length
    while (i--) {
      if (collection[i] == element) {
        return true
      }
    }
    return false
  },

  /**
   * Returns an array containing only distinct elements from the given collection.
   * @param {Object} collection array or array-like objects.
   * @returns {Array}
   */
  distinct: function(collection) {
    var distinct = []
    Collections.forEach(collection, function(element) {
      if (!Collections.contains(distinct, element)) {
        distinct.push(element)
      }
    })
    return distinct
  },

  /**
   * Iterate each element of this collection.
   * @param {Object} collection array or array-like objects.
   * @param {Function} action runnable to execute.
   */
  forEach: function(collection, action) {
    for (var i = 0; i < collection.length; i++) {
      action(collection[i], i)
    }
  },

  /**
   * Iterate each element of this collection as reversed.
   * @param {Object} collection array or array-like objects.
   * @param {Function} action runnable to execute.
   */
  forEachReversed: function(collection, action) {
    for (var i = Collections.lastIndex(collection); i >= 0; i--) {
      action(collection[i], i)
    }
  }
}
