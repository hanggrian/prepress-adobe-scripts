/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Slider}
 */
Group.prototype.slider = function(size, current, start, end, properties) {
  return Internals.addSlider(this, size, current, start, end, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {Number} current current value.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Slider}
 */
Panel.prototype.slider = function(size, current, start, end, properties) {
  return Internals.addSlider(this, size, current, start, end, properties)
}

Internals.addSlider = function(root, size, current, start, end, properties) {
  var child = root.add("slider", Internals.sizeOrBounds(size), current, start, end, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
