/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add button to dialog.
 * @returns {Button}
 */
Dialog.prototype.button = function(bounds, text, configuration, properties) {
    return _button(this.main, bounds, text, configuration, properties)
}

/**
 * Add button to group.
 * @returns {Button}
 */
Group.prototype.button = function(bounds, text, configuration, properties) {
    return _button(this, bounds, text, configuration, properties)
}

/**
 * Add button to panel.
 * @returns {Button}
 */
Panel.prototype.button = function(bounds, text, configuration, properties) {
    return _button(this, bounds, text, configuration, properties)
}

function _button(parent, bounds, text, configuration, properties) {
    var button = parent.add('button', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(button, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(button)
    }
    return button
}