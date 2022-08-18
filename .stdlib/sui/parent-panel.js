/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this parent.
 * @param {String} text tips to display.
 */
Panel.prototype.tooltips = function(text) { return Internals.setTooltips(this, text) }

/**
 * Add horizontal parent to group.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.hpanel = function(title, configuration) {
  return _panel(this, "row", title).also(configuration)
}

/**
 * Add horizontal parent to panel.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.hpanel = function(title, configuration) {
  return _panel(this, "row", title).also(configuration)
}

/**
 * Add vertical parent to group.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.vpanel = function(title, configuration) {
  return _panel(this, "column", title).also(configuration)
}

/**
 * Add vertical parent to panel.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.vpanel = function(title, configuration) {
  return _panel(this, "column", title).also(configuration)
}

/**
 * Add stack parent to group.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Group.prototype.spanel = function(title, configuration) {
  return _panel(this, "stack", title).also(configuration)
}

/**
 * Add stack parent to panel.
 * @param {String} title parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Panel}
 */
Panel.prototype.spanel = function(title, configuration) {
  return _panel(this, "stack", title).also(configuration)
}

function _panel(parent, orientation, title) {
  var result = parent.add("panel", undefined, title)
  result.orientation = orientation
  if (parent.helpTips !== undefined) {
    Internals.setTooltips(result, parent.helpTips)
  }
  if (title !== undefined) {
    // default margin is [15, 10, 15, 10], but this margin is unsufficient when title is present
    result.margins = [15, 15, 15, 10]
  }
  return result
}
