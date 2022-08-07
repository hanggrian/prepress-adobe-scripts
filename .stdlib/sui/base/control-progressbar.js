/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @returns {Progressbar}
 */
Progressbar.prototype.tip = function(text) { return _tip(this, text) }

/**
 * Add children to group.
 * @returns {Progressbar}
 */
Group.prototype.progressBar = function(bounds, start, stop, properties) { return _progressBar(this, bounds, start, stop, properties) }

/**
 * Add children to panel.
 * @returns {Progressbar}
 */
Panel.prototype.progressBar = function(bounds, start, stop, properties) { return _progressBar(this, bounds, start, stop, properties) }

function _progressBar(parent, bounds, start, stop, properties) {
  var result = parent.add("progressbar", _expandBounds(bounds), start, stop, properties)
  if (parent.helpTips !== undefined) {
    _tip(result, parent.helpTips)
  }
  return result
}
