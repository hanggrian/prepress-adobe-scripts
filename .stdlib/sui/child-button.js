/*
<javascriptresource>
  <menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
Button.prototype.tooltip = function(text) { return Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {Button}
 */
Group.prototype.button = function(bounds, text, properties) {
  return _button(this, bounds, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {Button}
 */
Panel.prototype.button = function(bounds, text, properties) {
  return _button(this, bounds, text, properties)
}

function _button(parent, bounds, text, properties) {
  var result = parent.add("button", Internals.expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
