/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
Slider.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Slider}
 */
Group.prototype.slider = function(bounds, current, start, end, properties) {
  return _slider(this, bounds, current, start, end, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Slider}
 */
Panel.prototype.slider = function(bounds, current, start, end, properties) {
  return _slider(this, bounds, current, start, end, properties)
}

function _slider(parent, bounds, current, start, end, properties) {
  var result = parent.add("slider", Internals.expandBounds(bounds), current, start, end, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
