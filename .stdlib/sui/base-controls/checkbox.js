/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add check box to group.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, properties) {
    return _checkBox(this, bounds, text, properties)
}

/**
 * Add check box to panel.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, properties) {
    return _checkBox(this, bounds, text, properties)
}

function _checkBox(parent, bounds, text, properties) {
    var checkBox = parent.add('checkbox', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(checkBox, parent.tooltips)
    }
    return checkBox
}