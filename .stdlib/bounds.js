/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Check if two bounds are equal. */
Array.prototype.equalTo = function(other) {
    return this.getLeft() === other.getLeft() &&
        this.getTop() === other.getTop() &&
        this.getRight() === other.getRight() &&
        this.getBottom() === other.getBottom()
}

/**
 * Returns true if the first bounds are inside the second bounds.
 * @see https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
 */
Array.prototype.isWithin = function(other) {
    return !(
		this.getLeft() < other.getLeft() ||
		this.getBottom() < other.getBottom() ||
		this.getRight() > other.getRight() ||
		this.getTop() > other.getTop()
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