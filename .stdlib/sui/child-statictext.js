/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String|Object} text tips to display.
 */
StaticText.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Group.prototype.leftStaticText = function(size, text, properties) {
  var child = _staticText(this, size, text, properties)
  child.text += ":"
  child.justify = "right"
  return child
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Panel.prototype.leftStaticText = function(size, text, properties) {
  var child = _staticText(this, size, text, properties)
  child.text += ":"
  child.justify = "right"
  return child
}

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Group.prototype.staticText = function(size, text, properties) {
  return _staticText(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(size, text, properties) {
  return _staticText(this, size, text, properties)
}

function _staticText(root, size, text, properties) {
  var child = root.add("statictext", Internals.sizeOrBounds(size), Internals.stringOrResources(text), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
