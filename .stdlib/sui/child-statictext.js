/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var JUSTIFY_LEFT = function(staticText) { staticText.justify = "left" }
var JUSTIFY_CENTER = function(staticText) { staticText.justify = "center" }
var JUSTIFY_RIGHT = function(staticText) { staticText.justify = "right" }

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
StaticText.prototype.tooltip = function(text) { return Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(bounds, text, properties) {
  return _staticText(this, bounds, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(bounds, text, properties) {
  return _staticText(this, bounds, text, properties)
}

function _staticText(parent, bounds, text, properties) {
  var result = parent.add("statictext", Internals.expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
