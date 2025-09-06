/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Static helper class for any array-like objects. This is due to Adobe's custom non-array
 * collection objects like `Artboards`, `PageItems`, etc.
 */
var Collections = {
  /**
   * Last index of this collection.
   * @param {!Array<*>|!PageItems} collection
   * @param {*|!PageItem} element
   * @return {number}
   */
  indexOf: function(collection, element) {
    checkNotNull(collection);
    checkNotNull(element);
    for (var i = 0; i < collection.length; i++) {
      if (collection[i] === element) {
        return i;
      }
    }
    error('Element not found in this collection');
  },

  /**
   * Last index of this collection.
   * @param {!Array<*>|!PageItems} collection
   * @return {number}
   */
  lastIndex: function(collection) {
    return checkNotNull(collection).length - 1;
  },

  /**
   * Returns true if this collection is empty.
   * @param {!IArguments|!Array<*>|!PageItems} collection
   * @return {boolean}
   */
  isEmpty: function(collection) {
    return checkNotNull(collection).length === 0;
  },

  /**
   * Returns true if this collection is not empty.
   * @param {!IArguments|!Array<*>|!PageItems} collection
   * @return {boolean}
   */
  isNotEmpty: function(collection) {
    return checkNotNull(collection).length > 0;
  },

  /**
   * Returns true if element belongs in this collection.
   * @param {!Array<*>|!PageItems} collection
   * @param {*|!PageItem} element
   * @return {boolean}
   */
  contains: function(collection, element) {
    checkNotNull(collection);
    checkNotNull(element);
    var i = collection.length;
    while (i--) {
      if (collection[i] === element) {
        return true;
      }
    }
    return false;
  },

  /**
   * Iterate each element of this collection.
   * @param {!Array<*>|!PageItems} collection
   * @param {function(*, number)} action
   */
  forEach: function(collection, action) {
    checkNotNull(collection);
    checkNotNull(action);
    for (var i = 0; i < collection.length; i++) {
      action(collection[i], i);
    }
  },

  /**
   * Returns an array containing only distinct elements from the given collection.
   * @param {!Array<*>|!PageItems} collection
   * @return {!Array<*>}
   */
  distinct: function(collection) {
    var result = [];
    Collections.forEach(
        collection,
        function(element) {
          if (!Collections.contains(result, element)) {
            result.push(element);
          }
        },
    );
    return result;
  },

  /**
   * Returns new array which is a copy of the original array.
   * @param {!Array<*>|!PageItems} collection
   * @return {!Array<*>}
   */
  copyOf: function(collection) {
    var result = [];
    Collections.forEach(
        collection,
        function(element) {
          result.push(element);
        },
    );
    return result;
  },

  /**
   * Returns new reversed array.
   * @param {!Array<*>|!PageItems} collection
   */
  reversed: function(collection) {
    var result = [];
    for (var i = Collections.lastIndex(collection); i >= 0; i--) {
      result.push(collection[i]);
    }
    return result;
  },
};
