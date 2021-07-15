/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/** Returns true if this list has a selection. */
DropDownList.prototype.hasSelection = function() { return this.selection !== null }

/** Change selection to ListItem with `text`. */
DropDownList.prototype.selectText = function(text) { this.selection = this.items.map(function(it) { return it.text }).indexOf(text) }

/**
 * Set tooltip to this children.
 * @returns {DropDownList}
 */
DropDownList.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {DropDownList}
 */
Group.prototype.dropDownList = function(bounds, items, properties) { return _dropDownList(this, bounds, items, properties) }

/**
 * Add children to panel.
 * @returns {DropDownList}
 */
Panel.prototype.dropDownList = function(bounds, items, properties) { return _dropDownList(this, bounds, items, properties) }

function _dropDownList(parent, bounds, items, properties) {
    var result = parent.add('dropdownlist', _expandBounds(bounds), items, properties)
    if (parent.helpTips !== undefined) {
        _tip(result, parent.helpTips)
    }
    return result
}