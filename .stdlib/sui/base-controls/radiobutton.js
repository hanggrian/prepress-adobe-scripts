/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add radio button to group.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, properties) {
    return _radioButton(this, bounds, text, properties)
}

/**
 * Add radio button to panel.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, properties) {
    return _radioButton(this, bounds, text, properties)
}

function _radioButton(parent, bounds, text, properties) {
    var radioButton = parent.add('radiobutton', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(radioButton, parent.tooltips)
    }
    return radioButton
}