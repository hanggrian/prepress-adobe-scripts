/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to all children.
 * @param {String|Object} text tips to display.
 */
Panel.prototype.setHelpTips = function(tips) { Internals.setHelpTips(this, tips) }

/**
 * Allows for multiple change listeners to occur by invoking all of them in collective listener.
 * @param {Function} listener a callable of no parameter.
 */
Panel.prototype.addChangeListener = function(listener) { Internals.addChangeListener(this, listener) }

/**
 * Add horizontal parent to group.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Group.prototype.hpanel = function(text, configuration) {
  return Internals.addPanel(this, "row", text, configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Panel.prototype.hpanel = function(text, configuration) {
  return Internals.addPanel(this, "row", text, configuration)
}

/**
 * Add vertical parent to group.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Group.prototype.vpanel = function(text, configuration) {
  return Internals.addPanel(this, "column", text, configuration)
}

/**
 * Add vertical parent to panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Panel.prototype.vpanel = function(text, configuration) {
  return Internals.addPanel(this, "column", text, configuration)
}

/**
 * Add stack parent to group.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Group.prototype.spanel = function(text, configuration) {
  return Internals.addPanel(this, "stack", text, configuration)
}

/**
 * Add stack parent to panel.
 * @param {String|Object} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @return {Panel}
 */
Panel.prototype.spanel = function(text, configuration) {
  return Internals.addPanel(this, "stack", text, configuration)
}

Internals.addPanel = function(root, orientation, text, configuration) {
  var parent = root.add("panel", undefined, text)
  parent.orientation = orientation
  if (text !== undefined) {
    // default margin is [15, 10, 15, 10], but this margin is unsufficient when title is present
    parent.margins = [15, 15, 15, 10]
  }
  if (configuration !== undefined) {
    configuration(parent)
  }
  return parent
}

/**
 * Returns selected radio index of this panel.
 * @return {Number}
 */
Panel.prototype.getSelectedRadioIndex = function() { return Internals.getSelectedRadioIndex(this) }

/**
 * Select radio button of this panel.
 * @param {Number} index index of radio button in this parent.
 */
Panel.prototype.selectRadioIndex = function(index) { Internals.selectRadioIndex(this, index) }
