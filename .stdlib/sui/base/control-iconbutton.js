/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {IconButton}
 */
IconButton.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {IconButton}
 */
Group.prototype.iconButton = function(bounds, file, properties) { return _iconButton(this, bounds, file, properties) }

/**
 * Add children to panel.
 * @returns {IconButton}
 */
Panel.prototype.iconButton = function(bounds, file, properties) { return _iconButton(this, bounds, file, properties) }

function _iconButton(parent, bounds, file, properties) {
  var result = parent.add('iconbutton', _expandBounds(bounds), _asFile(file), properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}
