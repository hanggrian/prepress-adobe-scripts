/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String} text tips to display.
 */
Progressbar.prototype.tooltip = function(text) { Internals.setTooltip(this, text) }

/**
 * Add children to group.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Progressbar}
 */
Group.prototype.progressBar = function(bounds, start, end, properties) {
  return _progressBar(this, bounds, start, end, properties)
}

/**
 * Add children to panel.
 * @param {Array} bounds optional array of size or position & size.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Progressbar}
 */
Panel.prototype.progressBar = function(bounds, start, end, properties) {
  return _progressBar(this, bounds, start, end, properties)
}

function _progressBar(parent, bounds, start, end, properties) {
  var result = parent.add("progressbar", Internals.expandBounds(bounds), start, end, properties)
  if (parent.helpTips !== undefined) {
    Internals.setTooltip(result, parent.helpTips)
  }
  return result
}
