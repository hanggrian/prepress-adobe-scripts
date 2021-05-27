var ACTIVATE = function(editText) { editText.activate() }
var VALIDATE_DIGITS = function(editText) { editText.validateDigits() }
var VALIDATE_UNITS = function(editText) { editText.validateUnits() }

/**
 * Add single-line edit text to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {EditText}
 */
Dialog.prototype.editText = function(bounds, text, configuration, properties) {
    return _editText(this.main, bounds, text, configuration, properties)
}

/**
 * Add single-line edit text to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {EditText}
 */
Group.prototype.editText = function(bounds, text, configuration, properties) {
    return _editText(this, bounds, text, configuration, properties)
}

/**
 * Add single-line edit text to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {EditText}
 */
Panel.prototype.editText = function(bounds, text, configuration, properties) {
    return _editText(this, bounds, text, configuration, properties)
}

function _editText(parent, bounds, text, configuration, properties) {
    var editText = parent.add('edittext', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(editText, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(editText)
    }
    return editText
}