/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
Image.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {Image}
 */
Group.prototype.image = function(bounds, file, properties) {
  return _image(this, bounds, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {String} text optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {Image}
 */
Panel.prototype.image = function(bounds, file, properties) {
  return _image(this, bounds, file, properties)
}

function _image(parent, bounds, file, properties) {
  var result = parent.add("image", Internals.expandBounds(bounds), Internals.getResourceFile(file), properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
