/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal group to group.
 * @returns {Group}
 */
Group.prototype.hgroup = function(configuration) {
    return _group(this, 'row', configuration)
}

/**
 * Add horizontal group to panel.
 * @returns {Group}
 */
Panel.prototype.hgroup = function(configuration) {
    return _group(this, 'row', configuration)
}

/**
 * Add horizontal group to tab.
 * @returns {Group}
 */
Object.prototype.hgroup = function(configuration) {
    check(this.type === 'tab')
    return _group(this, 'row', configuration)
}

/**
 * Add vertical group to group.
 * @returns {Group}
 */
Group.prototype.vgroup = function(configuration) {
    return _group(this, 'column', configuration)
}

/**
 * Add vertical group to panel.
 * @returns {Group}
 */
Panel.prototype.vgroup = function(configuration) {
    return _group(this, 'column', configuration)
}

/**
 * Add vertical group to tab.
 * @returns {Group}
 */
Object.prototype.vgroup = function(configuration) {
    check(this.type === 'tab')
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