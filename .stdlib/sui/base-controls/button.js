/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add button to group.
 * @returns {Button}
 */
Group.prototype.button = function(bounds, text, properties) {
    return _button(this, bounds, text, properties)
}

/**
 * Add button to panel.
 * @returns {Button}
 */
Panel.prototype.button = function(bounds, text, properties) {
    return _button(this, bounds, text, properties)
}

function _button(parent, bounds, text, properties) {
    var button = parent.add('button', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(button, parent.tooltips)
    }
    return button
}