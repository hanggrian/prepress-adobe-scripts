/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add static text to group.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(bounds, text, configuration, properties) {
    return _staticText(this, bounds, text, configuration, properties)
}

/**
 * Add static text to panel.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(bounds, text, configuration, properties) {
    return _staticText(this, bounds, text, configuration, properties)
}

function _staticText(parent, bounds, text, configuration, properties) {
    var staticText = parent.add('statictext', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(staticText, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(staticText)
    }
    return staticText
}