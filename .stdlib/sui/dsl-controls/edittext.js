/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add single-line edit text to group.
 * @returns {EditText}
 */
Group.prototype.editText = function(bounds, text, configuration, properties) {
    return _editText(this, bounds, text, configuration, properties)
}

/**
 * Add single-line edit text to panel.
 * @returns {EditText}
 */
Panel.prototype.editText = function(bounds, text, configuration, properties) {
    return _editText(this, bounds, text, configuration, properties)
}

function _editText(parent, bounds, text, configuration, properties) {
    var editText = parent.add('edittext', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(editText, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(editText)
    }
    return editText
}