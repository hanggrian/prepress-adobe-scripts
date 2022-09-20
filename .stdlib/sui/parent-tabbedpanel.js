/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {TabbedPanel}
 */
Group.prototype.tabbedPanel = function(configuration) {
  return Internals.addTabbedPanel(this, configuration)
}

/**
 * Add parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) {
  return Internals.addTabbedPanel(this, configuration)
}

Internals.addTabbedPanel = function(root, configuration) {
  var parent = root.add("tabbedpanel")
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}
