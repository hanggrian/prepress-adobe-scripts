var SELECTED = function(toggle) { toggle.select() }

/**
 * Add check box to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {CheckBox}
 */
Dialog.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this.main, bounds, text, configuration, properties)
}

/**
 * Add check box to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this, bounds, text, configuration, properties)
}

/**
 * Add check box to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this, bounds, text, configuration, properties)
}

function _checkBox(parent, bounds, text, configuration, properties) {
    var checkBox = parent.add('checkbox', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(checkBox, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(checkBox)
    }
    return checkBox
}

/**
 * Add radio button to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {RadioButton}
 */
 Dialog.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this.main, bounds, text, configuration, properties)
}

/**
 * Add radio button to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

/**
 * Add radio button to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

function _radioButton(parent, bounds, text, configuration, properties) {
    var radioButton = parent.add('radiobutton', _expandBounds(bounds), text, properties)
    if (parent.tooltips !== undefined) {
        _setTooltip(radioButton, parent.tooltips)
    }
    if (configuration !== undefined) {
        configuration(radioButton)
    }
    return radioButton
}