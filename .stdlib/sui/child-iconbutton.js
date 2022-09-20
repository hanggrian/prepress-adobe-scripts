/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String} file optional image source.
 * @param {Object} properties optional extra properties.
 * @return {IconButton}
 */
Group.prototype.iconButton = function(size, file, properties) {
  return Internals.addIconButton(this, size, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String} file optional image source.
 * @param {Object} properties optional extra properties.
 * @return {IconButton}
 */
Panel.prototype.iconButton = function(size, file, properties) {
  return Internals.addIconButton(this, size, file, properties)
}

Internals.addIconButton = function(root, size, file, properties) {
  var child = root.add("iconbutton", Internals.sizeOrBounds(size), Internals.imageOrResource(file), properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
