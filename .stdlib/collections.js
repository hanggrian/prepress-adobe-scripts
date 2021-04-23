// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/
// Functions declared in this script are `Object.prototype` and not `Array.prototype`.
// This is due to Adobe's custom non-array collection objects like `Artboards`, `PageItems`, etc.

/**
 * Last index of this collection.
 * @param {Object} element value within this collection.
 * @return {Boolean}
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
  * @return {Boolean}
  */
Object.prototype.lastIndex = function() { return this.length - 1 }

/**
 * First item of this collection.
 * @param {Function} predicate if defined, will search first item given the predicate.
 * @return {Object}
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
    throw new Error('Element not found given the predicate')
}

/**
 * Last item of this collection.
 * @param {Function} predicate if defined, will search first item given the predicate.
 * @return {Object}
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
    throw new Error('Element not found given the predicate')
}

/**
 * Returns true if this collection is empty.
 * @return {Boolean}
 */
Object.prototype.isEmpty = function() { return this.length === 0 }

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
 * Returns an array containing only distinct elements from the given collection.
 * @return {Array}
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
 * Returns a single sequence of all elements from results of transform function being invoked on each element of original sequence.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Object.prototype.flatMap = function(transform) {
    var result = []
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[i].length; j++) {
            result.push(transform(this[i][j]))
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