/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal tab to tabbed panel.
 * @returns {Group}
 */
Object.prototype.htab = function(title, configuration) {
    check(this.type === 'tabbedpanel')
    return _tab(this, 'row', title, configuration)
}

/**
 * Add vertical tab to tabbed panel.
 * @returns {Group}
 */
Object.prototype.vtab = function(title, configuration) {
    check(this.type === 'tabbedpanel')
    return _tab(this, 'column', title, configuration)
}

function _tab(parent, orientation, title, configuration) {
    var tab = parent.add('tab', undefined, title)
    var group = _group(tab, orientation, configuration)
    return group
}