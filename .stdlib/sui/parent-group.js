/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to all children.
 * @param {string|!Object=} tips
 */
Group.prototype.setHelpTips = function(tips) { Internals.setHelpTips(this, tips) }

/**
 * Add horizontal parent to group.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Group.prototype.hgroup = function(configuration) {
  return Internals.addGroup(this, 'row', configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Panel.prototype.hgroup = function(configuration) {
  return Internals.addGroup(this, 'row', configuration)
}

/**
 * Add vertical parent to group.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Group.prototype.vgroup = function(configuration) {
  return Internals.addGroup(this, 'column', configuration)
}

/**
 * Add vertical parent to panel.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Panel.prototype.vgroup = function(configuration) {
  return Internals.addGroup(this, 'column', configuration)
}

/**
 * Add stack parent to group.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Group.prototype.sgroup = function(configuration) {
  return Internals.addGroup(this, 'stack', configuration)
}

/**
 * Add stack parent to panel.
 * @param {function(!Group): undefined} configuration
 * @return {!Group}
 */
Panel.prototype.sgroup = function(configuration) {
  return Internals.addGroup(this, 'stack', configuration)
}

Internals.addGroup = function(root, orientation, configuration) {
  var parent = root.add('group')
  parent.orientation = orientation
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}

/**
 * Returns selected radio index of this group.
 * @return {number}
 */
Group.prototype.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(this) }

/**
 * Select radio button of this group.
 * @param {number} index
 */
Group.prototype.selectRadioIndex = function(index) { Internals.selectRadioIndex(this, index) }
