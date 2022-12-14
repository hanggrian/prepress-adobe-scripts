/*<javascriptresource><menu>hide</menu></javascriptresource>*/

/**
 * Add parent to group.
 * @param {?function(!TabbedPanel)=} configuration
 * @return {!TabbedPanel}
 */
Group.prototype.tabbedPanel = function(configuration) {
  return Internals.addTabbedPanel(this, configuration)
}

/**
 * Add parent to panel.
 * @param {?function(!TabbedPanel)=} configuration
 * @return {!TabbedPanel}
 */
Panel.prototype.tabbedPanel = function(configuration) {
  return Internals.addTabbedPanel(this, configuration)
}

Internals.addTabbedPanel = function(root, configuration) {
  var parent = root.add('tabbedpanel')
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}
