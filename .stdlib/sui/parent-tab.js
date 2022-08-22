/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Add horizontal parent to tabbed panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.htab = function(text, configuration) {
  check(this.type === "tabbedpanel")
  return _tab(this, "row", text, configuration)
}

/**
 * Add vertical parent to tabbed panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.vtab = function(text, configuration) {
  check(this.type === "tabbedpanel")
  return _tab(this, "column", text, configuration)
}

/**
 * Add stack parent to tabbed panel.
 * @param {String} text parent title.
 * @param {Function} configuration runnable with this parent as parameter.
 * @returns {Tab}
 */
Panel.prototype.stab = function(text, configuration) {
  check(this.type === "tabbedpanel")
  return _tab(this, "stack", text, configuration)
}

function _tab(parent, orientation, text, configuration) {
  var tab = parent.add("tab", undefined, text)
  var result = _group(tab, orientation)
  if (configuration !== undefined) {
    configuration(result)
  }
  return result
}
