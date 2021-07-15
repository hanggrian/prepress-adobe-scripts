/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var SELECTED = function(toggle) { toggle.select() }

/** Select this check box. */
Checkbox.prototype.select = function() { if (!this.value) this.value = true }

/** Select this radio button. */
RadioButton.prototype.select = function() { if (!this.value) this.value = true }

/**
 * Set tooltip to this children.
 * @returns {Checkbox}
 */
Checkbox.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, properties) { return _checkBox(this, bounds, text, properties) }

/**
 * Add children to panel.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, properties) { return _checkBox(this, bounds, text, properties) }

function _checkBox(parent, bounds, text, properties) {
    var result = parent.add('checkbox', _expandBounds(bounds), text, properties)
    if (parent.helpTips !== undefined) {
        _tip(result, parent.helpTips)
    }
    return result
}

/**
 * Set tooltip to this children.
 * @returns {RadioButton}
 */
RadioButton.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, properties) { return _radioButton(this, bounds, text, properties) }

/**
 * Add children to panel.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, properties) { return _radioButton(this, bounds, text, properties) }

function _radioButton(parent, bounds, text, properties) {
    var result = parent.add('radiobutton', _expandBounds(bounds), text, properties)
    if (parent.helpTips !== undefined) {
        _tip(result, parent.helpTips)
    }
    return result
}