Array.prototype.equalTo = function(other) {
    return this[0] === other[0] &&
        this[1] === other[1] &&
        this[2] === other[2] &&
        this[3] === other[3]
}

// see https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
Array.prototype.isWithin = function(other) {
    return !(
		this[0] < other[0] ||
		this[3] < other[3] ||
		this[2] > other[2] ||
		this[1] > other[1]
	)
}

/** Returns x1 value. */
Array.prototype.getLeft = function() { return this[0] }

/** Returns y1 value. */
Array.prototype.getTop = function() { return this[1] }

/** Returns x2 value. */
Array.prototype.getRight = function() { return this[2] }

/** Returns y2 value. */
Array.prototype.getBottom = function() { return this[3] }

/** Returns width value. */
Array.prototype.getWidth = function() { return this.getRight() - this.getLeft() }

/** Returns height value. */
Array.prototype.getHeight = function() { return this.getTop() - this.getBottom() }