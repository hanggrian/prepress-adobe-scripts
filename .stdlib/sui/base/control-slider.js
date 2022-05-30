/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {Slider}
 */
Slider.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {Slider}
 */
Group.prototype.slider = function(bounds, current, start, end, properties) { return _slider(this, bounds, current, start, end, properties) }

/**
 * Add children to panel.
 * @returns {Slider}
 */
Panel.prototype.slider = function(bounds, current, start, end, properties) { return _slider(this, bounds, current, start, end, properties) }

function _slider(parent, bounds, current, start, end, properties) {
  var result = parent.add('slider', _expandBounds(bounds), current, start, end, properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}