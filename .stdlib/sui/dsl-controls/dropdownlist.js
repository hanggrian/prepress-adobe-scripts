/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add drop down list to dialog.
 * @returns {DropDownList}
 */
Dialog.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this.main, bounds, items, configuration, properties)
}

/**
 * Add drop down list to group.
 * @returns {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this, bounds, items, configuration, properties)
}

/**
 * Add drop down list to panel.
 * @returns {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this, bounds, items, configuration, properties)
}

function _dropDownList(parent, bounds, items, configuration, properties) {
    var dropDownList = parent.add('dropdownlist', _expandBounds(bounds), items, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(dropDownList, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(dropDownList)
    }
    return dropDownList
}