/** 
 * Iterate each element of this list, doesn't work on array.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEach = function(action) {
    for (var i = 0; i < this.length; i++) {
        action(this[i], i)
    }
}

/**
 * Iterate each element of this list as reversed, doesn't work on array.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEachReversed = function(action) {
    for (var i = this.lastIndex(); i >= 0; i--) {
        action(this[i], i)
    }
}

/**
 * First item of this list.
 * @return {Object}
 */
Object.prototype.first = function() { return this[0] }

/**
 * Last item of this list.
 * @return {Object}
 */
Object.prototype.last = function() { return this[this.lastIndex] }

/**
 * Last index of this list.
 * @return {Boolean}
 */
Object.prototype.lastIndex = function() { return this.length - 1 }

/**
 * Returns true if this list is empty.
 * @return {Boolean}
 */
Object.prototype.isEmpty = function() { return this.length == 0 }

/** 
 * Returns true if this list is not empty.
 * @return {Boolean}
 */
Object.prototype.isNotEmpty = function() { return this.length > 0 }