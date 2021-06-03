/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal group to dialog.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Dialog.prototype.hgroup = function(configuration) {
    return _group(this.main, 'row', configuration)
}

/**
 * Add horizontal group to group.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Group.prototype.hgroup = function(configuration) {
    return _group(this, 'row', configuration)
}

/**
 * Add horizontal group to panel.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Panel.prototype.hgroup = function(configuration) {
    return _group(this, 'row', configuration)
}

/**
 * Add vertical group to dialog.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Dialog.prototype.vgroup = function(configuration) {
    return _group(this.main, 'column', configuration)
}

/**
 * Add vertical group to group.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Group.prototype.vgroup = function(configuration) {
    return _group(this, 'column', configuration)
}

/**
 * Add vertical group to panel.
 * @param {Function} configuration may be null.
 * @returns {Group}
 */
Panel.prototype.vgroup = function(configuration) {
    return _group(this, 'column', configuration)
}

function _group(parent, orientation, configuration) {
    var group = parent.add('group')
    group.orientation = orientation
    if (configuration !== undefined) {
        configuration(group)
    }
    return group
}