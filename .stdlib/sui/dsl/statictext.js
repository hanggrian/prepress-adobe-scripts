var JUSTIFY_LEFT = function(staticText) { staticText.justify = 'left' }
var JUSTIFY_CENTER = function(staticText) { staticText.justify = 'center' }
var JUSTIFY_RIGHT = function(staticText) { staticText.justify = 'right' }

/** 
 * Add static text to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {StaticText}
 */
Dialog.prototype.staticText = function(bounds, text, configuration) {
    return _staticText(this.main, bounds, text, configuration)
}

/** 
 * Add static text to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {StaticText}
 */
Group.prototype.staticText = function(bounds, text, configuration) {
    return _staticText(this, bounds, text, configuration)
}

/** 
 * Add static text to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration may be null.
 * @return {StaticText}
 */
Panel.prototype.staticText = function(bounds, text, configuration) {
    return _staticText(this, bounds, text, configuration)
}

function _staticText(parent, bounds, text, configuration) {
    var staticText = parent.add('statictext', bounds, text)
    if (configuration !== undefined) {
        configuration(staticText)
    }
    return staticText
}