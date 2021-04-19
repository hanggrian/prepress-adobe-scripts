/** 
 * Add drop down list to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration may be null.
 * @return {DropDownList}
 */
Dialog.prototype.dropDownList = function(bounds, items, configuration) {
    return _dropDownList(this.main, bounds, items, configuration)
}

/** 
 * Add drop down list to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration may be null.
 * @return {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, configuration) {
    return _dropDownList(this, bounds, items, configuration)
}

/** 
 * Add drop down list to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration may be null.
 * @return {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, configuration) {
    return _dropDownList(this, bounds, items, configuration)
}

function _dropDownList(parent, bounds, items, configuration) {
    var dropDownList = parent.add('dropdownlist', bounds, items)
    if (configuration !== undefined) {
        configuration(dropDownList)
    }
    return dropDownList
}