/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal panel to dialog.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Dialog.prototype.hpanel = function(title, configuration) {
    return _panel(this.main, 'row', title, configuration)
}

/**
 * Add horizontal panel to group.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Group.prototype.hpanel = function(title, configuration) {
    return _panel(this, 'row', title, configuration)
}

/**
 * Add horizontal panel to panel.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Panel.prototype.hpanel = function(title, configuration) {
    return _panel(this, 'row', title, configuration)
}

/**
 * Add vertical panel to dialog.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Dialog.prototype.vpanel = function(title, configuration) {
    return _panel(this.main, 'column', title, configuration)
}

/**
 * Add vertical panel to group.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Group.prototype.vpanel = function(title, configuration) {
    return _panel(this, 'column', title, configuration)
}

/**
 * Add vertical panel to panel.
 * @param {String} title of the panel.
 * @param {Function} configuration may be null.
 * @returns {Panel}
 */
Panel.prototype.vpanel = function(title, configuration) {
    return _panel(this, 'column', title, configuration)
}

function _panel(parent, orientation, title, configuration) {
    var panel = parent.add('panel', undefined, title)
    panel.orientation = orientation
    panel.add('group') // add tiny space
    if (configuration !== undefined) {
        configuration(panel)
    }
    return panel
}