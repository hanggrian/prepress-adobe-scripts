/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {Button}
 */
Button.prototype.tip = function (text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {Button}
 */
Group.prototype.button = function (bounds, text, properties) { return _button(this, bounds, text, properties) }

/**
 * Add children to panel.
 * @returns {Button}
 */
Panel.prototype.button = function (bounds, text, properties) { return _button(this, bounds, text, properties) }

function _button(parent, bounds, text, properties) {
  var result = parent.add('button', _expandBounds(bounds), text, properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}