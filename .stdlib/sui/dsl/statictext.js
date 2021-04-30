var JUSTIFY_LEFT = function(staticText) { staticText.justify = 'left' }
var JUSTIFY_CENTER = function(staticText) { staticText.justify = 'center' }
var JUSTIFY_RIGHT = function(staticText) { staticText.justify = 'right' }

/** 
 * Add static text to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {StaticText}
 */
Dialog.prototype.staticText = function(bounds, text, configuration, properties) {
    return _staticText(this.main, bounds, text, configuration, properties)
}

/** 
 * Add static text to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(bounds, text, configuration, properties) {
    return _staticText(this, bounds, text, configuration, properties)
}

/** 
 * Add static text to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(bounds, text, configuration, properties) {
    return _staticText(this, bounds, text, configuration, properties)
}

function _staticText(parent, bounds, text, configuration, properties) {
    var staticText = parent.add('statictext', _expandBounds(bounds), text, properties)
    if (parent.helpTips !== undefined) {
        staticText.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(staticText)
    }
    return staticText
}