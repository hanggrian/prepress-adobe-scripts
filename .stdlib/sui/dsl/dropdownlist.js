/** 
 * Add drop down list to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {DropDownList}
 */
Dialog.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this.main, bounds, items, configuration, properties)
}

/** 
 * Add drop down list to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this, bounds, items, configuration, properties)
}

/** 
 * Add drop down list to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {Array} items drop down collection.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, configuration, properties) {
    return _dropDownList(this, bounds, items, configuration, properties)
}

function _dropDownList(parent, bounds, items, configuration, properties) {
    var dropDownList = parent.add('dropdownlist', _expandBounds(bounds), items, properties)
    if (parent.helpTips !== undefined) {
        dropDownList.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(dropDownList)
    }
    return dropDownList
}