/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add radio button to dialog.
 * @returns {RadioButton}
 */
 Dialog.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this.main, bounds, text, configuration, properties)
}

/**
 * Add radio button to group.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

/**
 * Add radio button to panel.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

function _radioButton(parent, bounds, text, configuration, properties) {
    var radioButton = parent.add('radiobutton', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(radioButton, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(radioButton)
    }
    return radioButton
}