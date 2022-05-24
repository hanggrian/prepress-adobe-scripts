/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {Image}
 */
Image.prototype.tip = function (text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {Image}
 */
Group.prototype.image = function (bounds, file, properties) { return _image(this, bounds, file, properties) }

/**
 * Add children to panel.
 * @returns {Image}
 */
Panel.prototype.image = function (bounds, file, properties) { return _image(this, bounds, file, properties) }

function _image(parent, bounds, file, properties) {
  var result = parent.add('image', _expandBounds(bounds), _asFile(file), properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}