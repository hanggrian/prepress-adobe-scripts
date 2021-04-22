var ACTIVE = function(editText) { editText.activate() }
var VALIDATE_DIGITS = function(editText) { editText.validateDigits() }
var VALIDATE_UNITS = function(editText) { editText.validateUnits() }

/** 
 * Add single-line edit text to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Dialog.prototype.editText = function(bounds, text, configuration) {
    return _editText(this.main, false, bounds, text, configuration)
}

/** 
 * Add single-line edit text to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Group.prototype.editText = function(bounds, text, configuration) {
    return _editText(this, false, bounds, text, configuration)
}

/** 
 * Add single-line edit text to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Panel.prototype.editText = function(bounds, text, configuration) {
    return _editText(this, false, bounds, text, configuration)
}

/** 
 * Add multi-line edit text to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Dialog.prototype.multilineEditText = function(bounds, text, configuration) {
    return _editText(this, true, bounds, text, configuration)
}

/** 
 * Add multi-line edit text to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Group.prototype.multilineEditText = function(bounds, text, configuration) {
    return _editText(this, true, bounds, text, configuration)
}

/** 
 * Add multi-line edit text to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {EditText}
 */
Panel.prototype.multilineEditText = function(bounds, text, configuration) {
    return _editText(this, true, bounds, text, configuration)
}

function _editText(parent, multiline, bounds, text, configuration) {
    var editText = parent.add('edittext', _expandBounds(bounds), text, { multiline: multiline !== undefined ? multiline : false })
    if (parent.helpTips !== undefined) {
        editText.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(editText)
    }
    return editText
}