/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add children to group.
 * @param {?Array<number>=} size
 * @param {number} start
 * @param {number} end
 * @param {?Object=} properties
 * @return {!Progressbar}
 */
Group.prototype.progressBar = function(size, start, end, properties) {
  return Internals.addProgressBar(this, size, start, end, properties)
}

/**
 * Add children to panel.
 * @param {?Array<number>=} size
 * @param {number} start
 * @param {number} end
 * @param {?Object=} properties
 * @return {!Progressbar}
 */
Panel.prototype.progressBar = function(size, start, end, properties) {
  return Internals.addProgressBar(this, size, start, end, properties)
}

Internals.addProgressBar = function(root, size, start, end, properties) {
  var child = root.add('progressbar', Internals.sizeOrBounds(size), start, end, properties)
  if (root.helpTips !== undefined) {
    child.helpTip = root.helpTips
  }
  return child
}
