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
 * @returns {Button}
 */
Group.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String|Object} text optional control text.
 * @param {Object} properties optional extra properties.
 * @returns {Button}
 */
Panel.prototype.button = function(size, text, properties) {
  return Internals.addButton(this, size, text, properties)
}

Internals.addButton = function(root, size, text, properties) {
  var child = root.add("button", Internals.sizeOrBounds(size), text, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
