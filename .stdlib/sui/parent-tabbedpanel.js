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
  return _tabbedPanel(this, configuration)
}

/**
 * Add parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) {
  return _tabbedPanel(this, configuration)
}

function _tabbedPanel(root, configuration) {
  var parent = root.add("tabbedpanel")
  if (root.helpTips !== undefined) {
    Internals.setTooltips(parent, root.helpTips)
  }
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}
