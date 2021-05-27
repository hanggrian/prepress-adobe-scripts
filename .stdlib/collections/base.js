// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/
// Functions declared in this script are `Object.prototype` and not `Array.prototype`.
// This is due to Adobe's custom non-array collection objects like `Artboards`, `PageItems`, etc.

/**
 * Last index of this collection.
 * @param {Object} element value within this collection.
 * @returns {Boolean}
 */
Object.prototype.indexOf = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return i
        }
    }
    throw 'Element not found in this collection'
}

 /**
  * Last index of this collection.
  * @returns {Boolean}
  */
Object.prototype.lastIndex = function() { return this.length - 1 }

/**
 * Returns true if this collection is empty.
 * @returns {Boolean}
 */
Object.prototype.isEmpty = function() { return this.length === 0 }

/**
 * Returns true if this collection is not empty.
 * @returns {Boolean}
 */
Object.prototype.isNotEmpty = function() { return this.length > 0 }

/**
 * Returns true if element belongs in this collection.
 * @returns {Boolean}
 */
Object.prototype.contains = function(element) {
    var i = this.length
    while (i--) {
        if (this[i] === element) {
            return true
        }
    }
    return false
}

/**
 * Returns an array containing only distinct elements from the given collection.
 * @returns {Array}
 */
Object.prototype.distinct = function() {
    var distinct = []
    this.forEach(function(element) {
        if (!distinct.contains(element)) {
            distinct.push(element)
        }
    })
    return distinct
}