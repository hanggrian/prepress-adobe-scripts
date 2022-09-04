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
 * @returns {Image}
 */
Group.prototype.image = function(size, file, properties) {
  return Internals.addImage(this, size, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String} file optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {Image}
 */
Panel.prototype.image = function(size, file, properties) {
  return Internals.addImage(this, size, file, properties)
}

Internals.addImage = function(root, size, file, properties) {
  var child = root.add("image", Internals.sizeOrBounds(size), Internals.imageOrResource(file), properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
