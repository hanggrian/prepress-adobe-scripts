// Like stdlib collections but recursively search within GroupItem.

/**
 * Iterate each element of this collection.
 * @param {Function} action runnable to execute.
 */
Object.prototype.forEachItem = function(action) { _forEachItem(this, action) }

function _forEachItem(items, action) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].typename == 'GroupItem') {
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
        if (items[i].typename == 'GroupItem') {
            _forEachItemReversed(items[i].pageItems, action)
        } else {
            action(items[i], i)
        }
    }
}

/**
 * Returns an array containing the results of applying the given transform function.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Object.prototype.mapItem = function(transform) { 
    var result = []
    _mapItem(this, transform, result)
    return result
}

function _mapItem(items, transform, result) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].typename == 'GroupItem') {
            _mapItem(items[i].pageItems, transform, result)
        } else {
            result.push(transform(items[i], i))
        }
    }
}

/**
 * Returns an array containing the results of applying the given transform function while rejecting null value.
 * @param {Function} transform runnable with return value.
 * @return {Array}
 */
Object.prototype.mapItemNotNull = function(transform) { 
    var result = []
    _mapItemNotNull(this, transform, result)
    return result
}

function _mapItemNotNull(items, transform, result) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].typename == 'GroupItem') {
            _mapItemNotNull(items[i].pageItems, transform, result)
        } else {
            var element = transform(items[i], i)
            if (element !== null) {
                result.push(transform(items[i], i))
            }
        }
    }
}

/**
 * Returns a list containing only elements matching the given predicate.
 * @param {Function} predicate runnable with return value.
 * @return {Array}
 */
Object.prototype.filterItem = function(predicate) {
    var result = []
    _filterItem(this, predicate, result)
    return result
}

function _filterItem(items, predicate, result) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].typename == 'GroupItem') {
            _filterItem(items[i].pageItems, transform, result)
        } else {
            if (predicate(items[i], i)) {
                result.push(items[i])
            }
        }
    }
}