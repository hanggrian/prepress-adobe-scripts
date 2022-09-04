/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Group.prototype.leftStaticText = function(size, text, properties) {
  var child = Internals.addStaticText(this, size, text, properties)
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
  var child = Internals.addStaticText(this, size, text, properties)
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
  return Internals.addStaticText(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {StaticText}
 */
Panel.prototype.staticText = function(size, text, properties) {
  return Internals.addStaticText(this, size, text, properties)
}

Internals.addStaticText = function(root, size, text, properties) {
  var child = root.add("statictext", Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
