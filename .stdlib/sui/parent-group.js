/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @param {String} text tips to display.
 */
Group.prototype.tooltips = function(text) { return Internals.setTooltips(this, text) }

/**
 * Add horizontal parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.hgroup = function(configuration) {
  return _group(this, "row").also(configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.hgroup = function(configuration) {
  return _group(this, "row").also(configuration)
}

/**
 * Add vertical parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.vgroup = function(configuration) {
  return _group(this, "column").also(configuration)
}

/**
 * Add vertical parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.vgroup = function(configuration) {
  return _group(this, "column").also(configuration)
}

/**
 * Add stack parent to group.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Group.prototype.sgroup = function(configuration) {
  return _group(this, "stack").also(configuration)
}

/**
 * Add stack parent to panel.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Group}
 */
Panel.prototype.sgroup = function(configuration) {
  return _group(this, "stack").also(configuration)
}

function _group(parent, orientation) {
  var result = parent.add("group")
  result.orientation = orientation
  if (parent.helpTips !== undefined) {
    Internals.setTooltips(result, parent.helpTips)
  }
  return result
}

/**
 * Returns selected radio of this group.
 * @returns {RadioButton}
 */
Group.prototype.getSelectedRadioText = function() { return Internals.getSelectedRadioText(this) }

/**
 * Returns selected radio of this panel.
 * @returns {RadioButton}
 */
Panel.prototype.getSelectedRadioText = function() { return Internals.getSelectedRadioText(this) }

/**
 * Select radio button of this group.
 * @param {String} text existing text of any RadioButton, throws error if not found.
 */
Group.prototype.selectRadioText = function(text) { return Internals.selectRadioText(this, text) }

/**
 * Select radio button of this panel.
 * @param {String} text existing text of any RadioButton, throws error if not found.
 */
Panel.prototype.selectRadioText = function(text) { return Internals.selectRadioText(this, text) }
