/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
IconButton.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {IconButton}
 */
Group.prototype.iconButton = function(size, file, properties) {
  return _iconButton(this, size, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {IconButton}
 */
Panel.prototype.iconButton = function(size, file, properties) {
  return _iconButton(this, size, file, properties)
}

function _iconButton(root, size, file, properties) {
  var child = root.add("iconbutton", Internals.sizeToBounds(size), Internals.getResourceFile(file), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
