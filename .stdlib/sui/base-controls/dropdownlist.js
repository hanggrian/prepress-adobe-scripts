/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add drop down list to group.
 * @returns {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, properties) {
    return _dropDownList(this, bounds, items, properties)
}

/**
 * Add drop down list to panel.
 * @returns {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, properties) {
    return _dropDownList(this, bounds, items, properties)
}

function _dropDownList(parent, bounds, items, properties) {
    var dropDownList = parent.add('dropdownlist', _expandBounds(bounds), items, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(dropDownList, parent.tooltips)
    }
    return dropDownList
}