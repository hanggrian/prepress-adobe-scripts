/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @param {String|Object} text tips to display.
 */
Group.prototype.tooltips = function(text) { Internals.setTooltips(this, Internals.stringOrResources(text)) }

/**
 * Add horizontal parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.hgroup = function(configuration) {
  return _group(this, "row", configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.hgroup = function(configuration) {
  return _group(this, "row", configuration)
}

/**
 * Add vertical parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.vgroup = function(configuration) {
  return _group(this, "column", configuration)
}

/**
 * Add vertical parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.vgroup = function(configuration) {
  return _group(this, "column", configuration)
}

/**
 * Add stack parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.sgroup = function(configuration) {
  return _group(this, "stack", configuration)
}

/**
 * Add stack parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.sgroup = function(configuration) {
  return _group(this, "stack", configuration)
}

function _group(root, orientation, configuration) {
  var parent = root.add("group")
  parent.orientation = orientation
  if (root.helpTips !== undefined) {
    Internals.setTooltips(parent, root.helpTips)
  }
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}

/**
 * Returns selected radio index of this group.
 * @returns {Number}
 */
Group.prototype.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(this) }

/**
 * Select radio button of this group.
 * @param {String|Object} text existing text of any RadioButton, throws error if not found.
 */
Group.prototype.selectRadioIndex = function(index) {
  return Internals.selectRadioIndex(this, index)
}
