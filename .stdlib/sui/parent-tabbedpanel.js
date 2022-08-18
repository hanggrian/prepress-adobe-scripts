/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {TabbedPanel}
 */
Group.prototype.tabbedPanel = function(configuration) {
  return _tabbedPanel(this).also(configuration)
}

/**
 * Add parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) {
  return _tabbedPanel(this).also(configuration)
}

function _tabbedPanel(parent) {
  var result = parent.add("tabbedpanel")
  if (parent.helpTips !== undefined) {
    Internals.setTooltips(result, parent.helpTips)
  }
  return result
}
