// Functions declared in this script are `Object.prototype` and not `Array.prototype`.
// This is due to Adobe's custom non-array collection objects like `Artboards`, `PageItems`, etc.

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
 * Returns an array containing the results of applying the given transform function.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Object.prototype.map = function(transform) {
    var result = []
    for (var i = 0; i < this.length; i++) {
        result.push(transform(this[i], i))
    }
    return result
}

/**
 * Returns an array containing the results of applying the given transform function while rejecting null value.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Object.prototype.mapNotNull = function(transform) {
    var result = []
    for (var i = 0; i < this.length; i++) {
        var element = transform(this[i], i)
        if (element !== null) {
            result.push(element)
        }
    }
    return result
}

/**
 * Returns a list containing only elements matching the given predicate.
 * @param {Function} predicate runnable with return value.
 * @return {Array}
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