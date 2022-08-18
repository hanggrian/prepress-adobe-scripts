/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
IconButton.prototype.tooltip = function(text) { return Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {IconButton}
 */
Group.prototype.iconButton = function(bounds, file, properties) {
  return _iconButton(this, bounds, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {IconButton}
 */
Panel.prototype.iconButton = function(bounds, file, properties) {
  return _iconButton(this, bounds, file, properties)
}

function _iconButton(parent, bounds, file, properties) {
  var result = parent.add("iconbutton", Internals.expandBounds(bounds), Internals.getResourceFile(file), properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
