/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {Number} start min value.
 * @param {Number} end max value.
 * @param {Object} properties optional extra properties.
 * @returns {Progressbar}
 */
Group.prototype.progressBar = function(size, start, end, properties) {
  return Internals.addProgressBar(this, size, start, end, properties)
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
  return Internals.addProgressBar(this, size, start, end, properties)
}

Internals.addProgressBar = function(root, size, start, end, properties) {
  var child = root.add("progressbar", Internals.sizeOrBounds(size), start, end, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
