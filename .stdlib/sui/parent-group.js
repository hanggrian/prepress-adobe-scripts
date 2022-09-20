/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/


/**
 * Set tooltip to all children.
 * @param {String|Object} text tips to display.
 */
Group.prototype.setHelpTips = function(tips) { Internals.setHelpTips(this, tips) }

/**
 * Add horizontal parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Group.prototype.hgroup = function(configuration) {
  return Internals.addGroup(this, "row", configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Panel.prototype.hgroup = function(configuration) {
  return Internals.addGroup(this, "row", configuration)
}

/**
 * Add vertical parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Group.prototype.vgroup = function(configuration) {
  return Internals.addGroup(this, "column", configuration)
}

/**
 * Add vertical parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Panel.prototype.vgroup = function(configuration) {
  return Internals.addGroup(this, "column", configuration)
}

/**
 * Add stack parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Group.prototype.sgroup = function(configuration) {
  return Internals.addGroup(this, "stack", configuration)
}

/**
 * Add stack parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Group}
 */
Panel.prototype.sgroup = function(configuration) {
  return Internals.addGroup(this, "stack", configuration)
}

Internals.addGroup = function(root, orientation, configuration) {
  var parent = root.add("group")
  parent.orientation = orientation
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}

/**
 * Returns selected radio index of this group.
 * @return {Number}
 */
Group.prototype.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(this) }

/**
 * Select radio button of this group.
 * @param {String|Object} text existing text of any RadioButton, throws error if not found.
 */
Group.prototype.selectRadioIndex = function(index) { Internals.selectRadioIndex(this, index) }
