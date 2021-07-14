/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add tabbed panel to group.
 * @returns {TabbedPanel}
 */
Group.prototype.tabbedPanel = function(configuration) {
    return _tabbedPanel(this, configuration)
}

/**
 * Add tabbed panel to panel.
 * @returns {TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) {
    return _tabbedPanel(this, configuration)
}

/**
 * Add tabbed panel to panel.
 * @returns {TabbedPanel}
 */
Object.prototype.tabbedPanel = function(configuration) {
    return _tabbedPanel(this, configuration)
}

function _tabbedPanel(parent, configuration) {
    var tabbedPanel = parent.add('tabbedpanel')
    if (configuration !== undefined) {
        configuration(tabbedPanel)
    }
    return tabbedPanel
}