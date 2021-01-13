// Functions declared in this script are `Object.prototype` and not `Array.prototype`.
// This is due to Adobe's custom non-array collection objects like `Artboards`, `PageItems`, etc.

/**
 * Iterate each element of this collection.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEach = function(action) {
    for (var i = 0; i < this.length; i++) {
        action(this[i], i)
    }
}

/**
 * Iterate each element of this collection as reversed.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEachReversed = function(action) {
    for (var i = this.lastIndex(); i >= 0; i--) {
        action(this[i], i)
    }
}

/**
 * Returns an array containing the results of applying the given transform function to each entry in the original map.
 * @param {Function} tranform runnable with return value.
 */
Object.prototype.map = function(tranform) {
    var array = []
    for (var i = 0; i < this.length; i++) {
        array.push(tranform(this[i], i))
    }
    return array
}

/**
 * First item of this collection.
 * @return {Object}
 */
Object.prototype.first = function() { return this[0] }

/**
 * Last item of this collection.
 * @return {Object}
 */
Object.prototype.last = function() { return this[this.lastIndex()] }

/**
 * Last index of this collection.
 * @return {Boolean}
 */
Object.prototype.lastIndex = function() { return this.length - 1 }

/**
 * Returns true if this collection is empty.
 * @return {Boolean}
 */
Object.prototype.isEmpty = function() { return this.length == 0 }

/** 
 * Returns true if this collection is not empty.
 * @return {Boolean}
 */
Object.prototype.isNotEmpty = function() { return this.length > 0 }

/** 
 * Returns true if element belongs in this collection.
 * @return {Boolean}
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