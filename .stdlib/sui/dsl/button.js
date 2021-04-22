/** 
 * Add button to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {Button}
 */
Dialog.prototype.button = function(bounds, text, configuration) {
    return _button(this.main, bounds, text, configuration)
}

/** 
 * Add button to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {Button}
 */
Group.prototype.button = function(bounds, text, configuration) {
    return _button(this, bounds, text, configuration)
}

/** 
 * Add button to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {Button}
 */
Panel.prototype.button = function(bounds, text, configuration) {
    return _button(this, bounds, text, configuration)
}

function _button(parent, bounds, text, configuration) {
    var button = parent.add('button', _expandBounds(bounds), text)
    if (parent.helpTips !== undefined) {
        button.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(button)
    }
    return button
}