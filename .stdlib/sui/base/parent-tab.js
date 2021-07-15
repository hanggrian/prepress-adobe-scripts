/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal parent to tabbed panel.
 * @returns {Group}
 */
Object.prototype.vtab = function(title) {
    check(parent.type === 'tabbedpanel')
    return _tab(this, 'row', title).also(configuration)
}

/**
 * Add vertical parent to tabbed panel.
 * @returns {Group}
 */
Object.prototype.vtab = function(title) {
    check(parent.type === 'tabbedpanel')
    return _tab(this, 'column', title).also(configuration)
}

function _tab(parent, orientation, title) {
    return _group(parent.add('tab', undefined, title), orientation)
}