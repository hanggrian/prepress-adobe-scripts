/** 
 * Add empty space to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @return {Group}
 */
Dialog.prototype.space = function(bounds) {
    return _space(this.main, bounds)
}

/** 
 * Add empty space to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @return {Group}
 */
Group.prototype.space = function(bounds) {
    return _space(this, bounds)
}

/** 
 * Add empty space to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @return {Group}
 */
Panel.prototype.space = function(bounds) {
    return _space(this, bounds)
}

function _space(parent, bounds) {
    return parent.add('group', _expandBounds(bounds))
}