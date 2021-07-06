/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal panel to dialog.
 * @returns {Panel}
 */
Dialog.prototype.hpanel = function(title, configuration) {
    return _panel(this.main, 'row', title, configuration)
}

/**
 * Add horizontal panel to group.
 * @returns {Panel}
 */
Group.prototype.hpanel = function(title, configuration) {
    return _panel(this, 'row', title, configuration)
}

/**
 * Add horizontal panel to panel.
 * @returns {Panel}
 */
Panel.prototype.hpanel = function(title, configuration) {
    return _panel(this, 'row', title, configuration)
}

/**
 * Add horizontal panel to tab.
 * @returns {Panel}
 */
 Object.prototype.hpanel = function(title, configuration) {
    return _panel(this, 'row', title, configuration)
}

/**
 * Add vertical panel to dialog.
 * @returns {Panel}
 */
Dialog.prototype.vpanel = function(title, configuration) {
    return _panel(this.main, 'column', title, configuration)
}

/**
 * Add vertical panel to group.
 * @returns {Panel}
 */
Group.prototype.vpanel = function(title, configuration) {
    return _panel(this, 'column', title, configuration)
}

/**
 * Add vertical panel to panel.
 * @returns {Panel}
 */
Panel.prototype.vpanel = function(title, configuration) {
    return _panel(this, 'column', title, configuration)
}

/**
 * Add vertical panel to tab.
 * @returns {Panel}
 */
 Object.prototype.vpanel = function(title, configuration) {
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