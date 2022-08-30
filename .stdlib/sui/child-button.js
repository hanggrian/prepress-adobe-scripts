/*
<javascriptresource>
  <menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String|Object} text tips to display.
 */
Button.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {Button}
 */
Group.prototype.button = function(size, text, properties) {
  return _button(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {Button}
 */
Panel.prototype.button = function(size, text, properties) {
  return _button(this, size, text, properties)
}

function _button(root, size, text, properties) {
  var child = root.add("button", Internals.sizeOrBounds(size), Internals.stringOrResources(text), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
