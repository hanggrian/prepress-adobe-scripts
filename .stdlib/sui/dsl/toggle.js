var SELECTED = function(toggle) { toggle.value = true }

/** 
 * Add check box to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {CheckBox}
 */
Dialog.prototype.checkBox = function(bounds, text, configuration) {
    return _checkBox(this.main, bounds, text, configuration)
}

/** 
 * Add check box to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, configuration) {
    return _checkBox(this, bounds, text, configuration)
}

/** 
 * Add check box to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, configuration) {
    return _checkBox(this, bounds, text, configuration)
}

function _checkBox(parent, bounds, text, configuration) {
    var checkBox = parent.add('checkbox', bounds, text)
    if (configuration !== undefined) {
        configuration(checkBox)
    }
    return checkBox
}

/** 
 * Add radio button to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {RadioButton}
 */
 Dialog.prototype.radioButton = function(bounds, text, configuration) {
    return _radioButton(this.main, bounds, text, configuration)
}

/** 
 * Add radio button to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, configuration) {
    return _radioButton(this, bounds, text, configuration)
}

/** 
 * Add radio button to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, configuration) {
    return _radioButton(this, bounds, text, configuration)
}

function _radioButton(parent, bounds, text, configuration) {
    var radioButton = parent.add('radiobutton', bounds, text)
    if (configuration !== undefined) {
        configuration(radioButton)
    }
    return radioButton
}