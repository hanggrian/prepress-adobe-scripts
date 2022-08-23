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
StaticText.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(size, text, properties) {
  return _staticText(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(size, text, properties) {
  return _staticText(this, size, text, properties)
}

function _staticText(root, size, text, properties) {
  var child = root.add("statictext", Internals.sizeToBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
