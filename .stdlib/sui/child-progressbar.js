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
 * @param {Array} size optional size or bounds.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Progressbar}
 */
Group.prototype.progressBar = function(size, start, end, properties) {
  return _progressBar(this, size, start, end, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Progressbar}
 */
Panel.prototype.progressBar = function(size, start, end, properties) {
  return _progressBar(this, size, start, end, properties)
}

function _progressBar(root, size, start, end, properties) {
  var child = root.add("progressbar", Internals.sizeToBounds(size), start, end, properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
