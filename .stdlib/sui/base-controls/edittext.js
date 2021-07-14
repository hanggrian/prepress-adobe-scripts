/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add single-line edit text to group.
 * @returns {EditText}
 */
Group.prototype.editText = function(bounds, text, properties) {
    return _editText(this, bounds, text, properties)
}

/**
 * Add single-line edit text to panel.
 * @returns {EditText}
 */
Panel.prototype.editText = function(bounds, text, properties) {
    return _editText(this, bounds, text, properties)
}

function _editText(parent, bounds, text, properties) {
    var editText = parent.add('edittext', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(editText, parent.tooltips)
    }
    return editText
}